import { writeFileSync } from 'fs';
import log from 'spm-log';
import { join } from 'path';

export default function save(result, query, context) {
  log.info('save task', 'saving result into json file');
  const { maxKeys, cwd, arrayToObject } = context;
  const { dest } = query;

  const langs = maxKeys(result);

  const saveResult = arrayToObject(langs.map(lang => ({
    lang,
    file: `${join(cwd, dest, lang)}.json`,
    content: {},
  })), 'lang');

  result.forEach(item => {
    langs.forEach(lang => {
      saveResult[lang].content[item.id] = item[lang];
    });
  });


  Object.keys(saveResult).forEach(item => {
    writeFileSync(saveResult[item].file, JSON.stringify(saveResult[item].content, null, 2));
  });
  return true;
}
