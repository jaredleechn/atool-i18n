import { arrayToObject } from './util';
import log from 'spm-log';

export default function fill(result, files) {
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

  log.info('fill local', 'diffing with local locales files...');
  const originDest = arrayToObject(files, 'lang');
  const newDest = arrayToObject(files, 'lang');

  const ids = Object.keys(result);
  const langs = Object.keys(originDest);

  let local;
  let remote;

  ids.forEach(id => {
    langs.forEach(lang => {
      local = originDest[lang].content[id];
      remote = result[id][lang];

      if (local && local !== remote) {
        log.warn(`id: ${id}`, `using ${local} instead of ${remote}`);
        newDest[lang].content[id] = local;
      } else {
        newDest[lang].content[id] = remote;
      }
    });
  });

  return newDest;
}
