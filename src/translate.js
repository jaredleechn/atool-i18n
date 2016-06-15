import 'babel-polyfill';
import { join } from 'path';
import { resolvePlugins } from './plugin';

export default function translate(options) {
  const { source, dest, cwd } = options;

  const context = { source, dest, cwd };
  context.set = (key, val) => (context[key] = val);
  context.get = key => context[key];

  const resolveDir = [cwd];
  const pluginNames = options.plugins;

  const beforeMiddleware = require('./plugins/summary');

  const plugins = resolvePlugins(pluginNames, resolveDir, cwd);

  plugins.reduce((a, b) => {
    if (a instanceof Promise) {
      return a.then(result => b.plugin(result, b.query, context));
    }
    return b.plugin(a, b.query, context);
  }, beforeMiddleware(null, {
    source: join(cwd, source, '**/*.json'),
    key: 'id',
  }, context));
}
