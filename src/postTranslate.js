import request from 'co-request';
import 'babel-polyfill';
import log from 'spm-log';

export default async function post() {
  log.info('post task', 'post translate task to server...');
  return await request({
    uri: 'http://127.0.0.1/post',
    method: 'POST',
  });
}
