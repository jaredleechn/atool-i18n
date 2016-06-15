import { arrayToObject } from '../util';
import log from 'spm-log';
import { join } from 'path';
import { select } from '../util';

export default async function merge(result, query, context) {
  /*
  result: {
    totalPrice: {
      en: "totalPrice",
      cn: "总价",
    },
    otherPrice: {
      en: "otherPrice",
      cn: "其他价格",
    }
  }

  files: [{
    lang: 'en',
    file: '/user/local/Desktop/en.json',
    content: {
      totalPrice: "totalPrice",
    },
  }]
  */

  const defaultMap = {
    en: 'en.json',
    cn: 'cn.json',
  };

  const { cwd, dest } = context;

  const files = Object.keys(defaultMap).map(lang => ({
    lang,
    file: join(cwd, dest, defaultMap[lang]),
    content: require(join(cwd, dest, defaultMap[lang])),
  }));

  log.info('merge task', 'diffing with local locales files');
  const originDest = arrayToObject(files, 'lang');
  const newDest = arrayToObject(files, 'lang');

  const ids = Object.keys(result);
  const langs = Object.keys(originDest);

  let local;
  let remote;

  for (const id of ids) {
    for (const lang of langs) {
      local = originDest[lang].content[id];
      remote = result[id][lang];

      if (local && local !== remote) {
        // log.warn(`id: ${id}`, `using ${local} instead of ${remote}`);
        newDest[lang].content[id] = await select({
          local,
          remote,
        }, `decide local or remote ${lang} translate for ${id}`);
      } else {
        newDest[lang].content[id] = remote;
      }
    }
  }

  return newDest;
}
