import request from 'co-request';
import log from 'spm-log';

export default async function post(result, query) {
  const server = query.server || 'http://127.0.0.1';

  log.info('post task', `posting to ${server}`);
  await request({
    uri: server,
    method: 'POST',
  });
  log.info('post task', 'posted');
  return result;
}
