import { sync } from 'glob';
import log from 'spm-log';
import { join } from 'path';

export default function summary(result, query, context) {
  const source = {
    source: 'i18n-messages',
    cwd: context.cwd,
    patten: '**/*.json',
    ...query,
  };

  const path = join(source.cwd, source.source, source.patten);
  log.info('summary task', path);
  return sync(path)
    .map(item => require(item))
    .reduce((a, b) => a.concat(b));
}

