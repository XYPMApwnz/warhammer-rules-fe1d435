const SCHEMA='wh40k-effective-points-projection/v1';
const clean=value=>String(value??'').trim();
const list=value=>Array.isArray(value)?value:[];
const unique=(items,keyOf,label)=>{
  const seen=new Set();
  for(const item of items){
    const key=clean(keyOf(item));
    if(!key)throw new Error(`${label} requires a canonical identity`);
    if(seen.has(key))throw new Error(`duplicate ${label} identity: ${key}`);
    seen.add(key);
  }
};
const validatePoints=(bookId,unit)=>{
  if(!Array.isArray(unit.points)||!unit.points.length)throw new Error(`${bookId}: ${unit.id} is missing a required point schedule`);
  const tiers=new Set();
  for(const [index,tier] of unit.points.entries()){
    if(typeof tier?.label!=='string'||!tier.label.trim())throw new Error(`${bookId}: ${unit.id} point tier ${index+1} requires a label`);
    if(typeof tier.value!=='number'||!Number.isFinite(tier.value))throw new Error(`${bookId}: ${unit.id} point tier ${index+1} requires a finite value`);
    const tierId=clean(tier.id)||`${tier.label}\0${tier.value}`;
    if(tiers.has(tierId))throw new Error(`${bookId}: ${unit.id} has duplicate point tier ${tierId}`);
    tiers.add(tierId);
  }
};

export function createEffectivePointsProjection(input={}){
  const book={id:clean(input.book?.id),title:clean(input.book?.title),parentBookId:input.book?.parentBookId??null};
  if(!book.id||!book.title)throw new Error('effective points projection requires book id and title');
  const units=list(input.units).map(unit=>({...unit,id:clean(unit.id),title:clean(unit.title),sourceBookId:clean(unit.sourceBookId)||book.id}));
  const detachments=list(input.detachments).map(item=>({...item,id:clean(item.id),title:clean(item.title),sourceBookId:clean(item.sourceBookId)||book.id}));
  const enhancements=list(input.enhancements).map(item=>({...item,id:clean(item.id),detachmentId:clean(item.detachmentId),title:clean(item.title),sourceBookId:clean(item.sourceBookId)||book.id}));
  unique(units,item=>item.id,`${book.id} unit`);
  unique(detachments,item=>item.id,`${book.id} Detachment`);
  unique(enhancements,item=>`${item.detachmentId}\0${item.id}`,`${book.id} scoped Enhancement`);
  const detachmentIds=new Set(detachments.map(item=>item.id));
  for(const unit of units){
    if(!unit.title)throw new Error(`${book.id}: ${unit.id} requires a title`);
    validatePoints(book.id,unit);
    if(!unit.ruleProfile||unit.ruleProfile.id!==unit.id||unit.ruleProfile.unitId!==unit.id)throw new Error(`${book.id}: ${unit.id} requires its canonical rule profile`);
  }
  for(const item of detachments)if(!item.title)throw new Error(`${book.id}: ${item.id} requires a title`);
  for(const item of enhancements){
    if(!item.title)throw new Error(`${book.id}: ${item.id} requires a title`);
    if(!item.detachmentId||!detachmentIds.has(item.detachmentId))throw new Error(`${book.id}: ${item.id} references unknown Detachment ${item.detachmentId||'(missing)'}`);
    if(typeof item.value!=='number'||!Number.isFinite(item.value))throw new Error(`${book.id}: ${item.id} requires a finite point value`);
  }
  return {schema:SCHEMA,book,dependencies:list(input.dependencies),units,detachments,enhancements};
}

export function assertEffectivePointsProjection(value,bookId=''){
  if(value?.schema!==SCHEMA)throw new Error(`${bookId||'book'}: invalid effective points projection schema`);
  if(bookId&&value.book?.id!==bookId)throw new Error(`${bookId}: effective points projection belongs to ${value.book?.id||'(missing)'}`);
  return value;
}

export const effectivePointsProjectionSchema=SCHEMA;
