import crypto from 'node:crypto';
import fs from 'node:fs';

export const normalizedTextSha256=text=>crypto.createHash('sha256')
  .update(String(text).replace(/\r\n?/g,'\n'),'utf8')
  .digest('hex')
  .toUpperCase();

export const normalizedFileSha256=file=>normalizedTextSha256(fs.readFileSync(file,'utf8'));
