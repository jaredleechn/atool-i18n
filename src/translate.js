import { sync } from 'glob';
import { join } from 'path';
import { readFileSync } from 'fs';
import co from 'co';
import postTranslate from './postTranslate';
import fetchTranslate from './fetchTranslate';
import fillLocal from './fillLocal';

export default function translate(options) {
  const { source, dest, cwd } = options;

  const defaultMap = {
    en: 'en.js',
    cn: 'cn.js',
  }

  const pkg = readFileSync(join(cwd, 'package.json'), 'utf-8');

  const originTemplate = readFileSync(join(cwd, source), 'utf-8');

  const originDest = sync(`${join(cwd, dest)}/**/*.js`).map(file => readFileSync(file, 'utf-8'));

  co(function*(){
    const success = yield postTranslate(originTemplate);

    if (success) {
      console.log('post success, now fetching the lastest translate');
    }

    const result = yield fetchTranslate(pkg.name);

    fillLocal(result, originDest);
  });

}
