import request from 'co-request';
import log from 'spm-log';

const server = 'http://fanyi.youdao.com/openapi.do?keyfrom=transome&key=1280891551&type=data&doctype=json&version=1.1&q=';

async function trans(word) {
  const { body } = await request(server + encodeURI(word));
  const res = JSON.parse(body).translation;
  log.info(word, res);
  return res;
}

async function fillRecord(base, obj, langs, defaultKey) {
  const res = {
    ...obj,
  };
  for (const lang of langs) {
    if (defaultKey === lang) {
      res[lang] = res.defaultMessage;
    } else {
      res[lang] = res[lang] || {};
      for (const key of base) {
        const resps = await trans(obj[key], lang);
        resps.forEach(resp => {
          res[lang][`${resp} - from youdao based on ${key}`] = resp;
        });
      }
    }
  }
  return res;
}

export default async function youdao(result, query) {
  const langs = query.langs || ['en', 'cn'];
  const base = [query.key || 'id', 'defaultMessage'];
  const defaultKey = query.default;
  log.info('youdao task', `translating langs of ${langs}`);

  const translation = await Promise.all(
    result.map(obj => fillRecord(base, obj, langs, defaultKey))
  );

  return translation;
}
