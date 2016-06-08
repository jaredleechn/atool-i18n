import { writeFileSync } from 'fs';
import log from 'spm-log';

export default function save(files) {
  log.info('save', 'saving result into json file...');
  Object.keys(files).forEach(item => {
    writeFileSync(files[item].file, JSON.stringify(files[item].content, null, 2));
  });
  return true;
}
