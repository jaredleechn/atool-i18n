import 'babel-polyfill';
import { resolvePlugins } from './plugin';
import * as utils from './util';

export default function translate(options) {
  const { cwd, middleware } = options;

  const context = {
    ...utils,
    cwd,
  };
  context.set = (key, val) => (context[key] = val);
  context.get = key => context[key];

  const resolveDir = [cwd];
  const pluginNames = Object.keys(middleware).reduce((a, b) => a.concat(middleware[b]), []);

  const plugins = resolvePlugins(pluginNames, resolveDir, cwd);

  plugins.reduce((a, b) => {
    if (a instanceof Promise) {
      return a.then(result => b.plugin(result, b.query, context));
    }
    return b.plugin(a, b.query, context);
  }, Promise.resolve());
}
