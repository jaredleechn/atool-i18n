import log from 'spm-log';
import { select } from '../util';

export default async function pick(result) {
  log.info('pick task', 'picking suggestion');

  const backUp = {
    ...result,
  };

  const ids = Object.keys(result);

  for (const id of ids) {
    for (const lang of Object.keys(result[id])) {
      backUp[id][lang] = await select(result[id][lang], `choose ${lang} translate for ${id}`);
    }
  }
  return backUp;
}
