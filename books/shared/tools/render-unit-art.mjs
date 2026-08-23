export function renderUnitArt({unit,unitImages,escape}){
  const art=unitImages?.[unit.id];
  if(!art)return '';
  const esc=escape,desktop=art.presentation.desktop,phone=art.presentation.phone;
  if(art.presentation.mode==='background'){
    const vars=`--unit-art-background-scale:${esc(desktop.scale)};--unit-art-background-x:${esc(desktop.x)};--unit-art-background-y:${esc(desktop.y)};--unit-art-background-opacity:${esc(desktop.opacity)};--unit-art-background-phone-scale:${esc(phone.scale)};--unit-art-background-phone-x:${esc(phone.x)};--unit-art-background-phone-y:${esc(phone.y)};--unit-art-background-phone-opacity:${esc(phone.opacity)}`;
    return `<figure class="unit-art-background" aria-hidden="true" style="${vars}"><img src="./${esc(art.asset)}" width="${esc(art.width)}" height="${esc(art.height)}" alt="" loading="lazy" decoding="async"></figure>`;
  }
  const vars=`--unit-art-scale:${esc(desktop.scale)};--unit-art-x:${esc(desktop.x)};--unit-art-y:${esc(desktop.y)};--unit-art-phone-scale:${esc(phone.scale)};--unit-art-phone-x:${esc(phone.x)};--unit-art-phone-y:${esc(phone.y)}`;
  return `<figure class="unit-art" aria-hidden="true" style="${vars}"><img src="./${esc(art.asset)}" width="${esc(art.width)}" height="${esc(art.height)}" alt="" loading="lazy" decoding="async"></figure>`;
}