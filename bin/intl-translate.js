#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .option('--source <dir>', '', 'messages/todo.json')
  .option('--dest <dir>', '', 'src/locales')
  .parse(process.argv);

program.cwd = process.cwd();
require('../lib/translate')(program);
