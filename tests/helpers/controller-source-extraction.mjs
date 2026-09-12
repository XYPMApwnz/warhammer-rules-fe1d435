export const normalizeEol=text=>String(text).replace(/\r\n/g,'\n');

const escapeRegExp=value=>String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

export function extractControllerClass(source,className,globalName){
  const normalized=normalizeEol(source);
  const pattern=new RegExp(`(class ${escapeRegExp(className)}\\{[\\s\\S]*?\\n  \\})\\n\\n  window\\.${escapeRegExp(globalName)}`);
  return normalized.match(pattern)?.[1]||'';
}
