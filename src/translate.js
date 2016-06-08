import { sync } from 'glob';
import { join } from 'path';
import { readFileSync } from 'fs';
import co from 'co';
import postTranslate from './postTranslate';
import save from './save';
import fetchTranslate from './fetchTranslate';
import fillLocal from './fillLocal';
import { arrayToObject } from './util';
import log from 'spm-log';

function reduceJsonFiles(source) {
  return sync(`${source}/**/*.json`)
    .map(item => require(item))
    .reduce((a, b) => a.concat(b));
}

export default function translate(options) {
  const { source, dest, cwd } = options;
  const pkg = require(join(cwd, 'package.json'));

  log.info('summary', 'summarying json files...');
  const summary = arrayToObject(reduceJsonFiles(join(cwd, source)), 'id');

  co(async function () {
    const success = await postTranslate(summary);

    const result = await fetchTranslate(pkg.name);

    const defaultMap = {
      en: 'en.json',
      cn: 'cn.json',
    }

    const localFiles = Object.keys(defaultMap).map(lang => ({
      lang,
      file: join(cwd, dest, defaultMap[lang]),
      content: require(join(cwd, dest, defaultMap[lang])),
    }));

    const newDest = fillLocal(result, localFiles);

    save(newDest);
  });

}
