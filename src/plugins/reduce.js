import log from 'spm-log';
import { join } from 'path';

function fetchOne(record, local) {
  const langs = Object.keys(record);
  const result = record;
  langs.forEach(lang => {
    if (local[lang] && local[lang][record.id] && record[lang].constructor === Object) {
      const des = `${local[lang][record.id]} - from local`;
      result[lang][des] = local[lang][record.id];
    }
  });
  return record;
}

function exists(path) {
  try {
    require.resolve(path);
  } catch (e) {
    return false;
  }
  return true;
}

function fetchLocal(result, local) {
  return result.map(item => fetchOne(item, local));
}

export default async function pick(result, query, context) {
  log.info('reduce task', 'picking the best translation');
  /*
  result: [{
    id: 'totalPrice',
    description: '展示订单总额',
    defaultMessage: '订单全额',
    cn: {'The order in full - from google': 'The order in full'},
    en: {'The order in full - from google': 'The order in full'},
  }, {
    id: 'totalPrices',
    description: '展示订单总额',
    defaultMessage: '订单全额',
    cn: {'The order in full - from google': 'The order in full'},
    en: {'The order in full - from google': 'The order in full'},
  }];
  */

  let pickResource = result;

  const { local } = query;
  const { select, isObject, maxKeys } = context;

  if (local) {
    const file = maxKeys(result)
      .reduce((collect, lang) => ({
        ...collect,
        [lang]: exists(join(context.cwd, local, lang))
          ? require(join(context.cwd, local, lang))
          : {},
      }), {});
    pickResource = fetchLocal(result, file);
  }

  for (const item of pickResource) {
    const langs = Object.keys(item);
    log.warn('picking best translation', item.id);
    for (const lang of langs) {
      if (isObject(item[lang])) {
        item[lang] = await select(item[lang], `picking ${lang}`);
      }
    }
  }
  return pickResource;
}
