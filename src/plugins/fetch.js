import request from 'co-request';
import log from 'spm-log';

export default async function fetch(result, query) {
  const server = query.server || 'http://127.0.0.1/result.json';
  const { body } = await request({
    uri: server,
  });

  const res = JSON.parse(body);

  log.info('fetch from server',
    `version ${res.version} with ${Object.keys(res.result).length} ids`);
  return res.result;
}
