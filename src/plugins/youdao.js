import request from 'co-request';
import log from 'spm-log';

const server = 'http://fanyi.youdao.com/openapi.do?keyfrom=transome&key=1280891551&type=data&doctype=json&version=1.1&q=';

async function trans(word) {
  const { body } = await request(server + encodeURI(word));
  const res = JSON.parse(body).translation;
  log.info(word, res);
  return res;
}

async function fillRecord(defaultMessage, obj, langs, formater) {
  const res = {
    ...obj,
  };
  for (const lang of langs) {
    res[lang] = formater(await trans(defaultMessage, lang), 'from youdao');
  }
  return res;
}

export default async function google(result, query, context) {
  log.info('youdao task', 'translating');

  const translation = await Promise.all(
    result.map(obj => fillRecord(obj.defaultMessage, obj, query.langs, context.format))
  );

  return translation;
}
