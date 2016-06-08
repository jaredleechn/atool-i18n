import request from 'co-request';
import 'babel-polyfill';
import log from 'spm-log';

export default async function fetch() {
  const { body } = await request('http://127.0.0.1/result.json');

  const result = JSON.parse(body);

  log.info('fetch from server',
    `version ${result.version} with ${Object.keys(result.result).length} ids`);

  return result.result;
}
