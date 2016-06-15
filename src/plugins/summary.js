import { sync } from 'glob';
import log from 'spm-log';

export default function summary(result, query) {
  const { source } = query;
  log.info('summary task', source);
  return sync(source)
    .map(item => require(item))
    .reduce((a, b) => a.concat(b));
}
