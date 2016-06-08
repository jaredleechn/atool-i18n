#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .option('--source <dir>', '', 'i18n-messages')
  .option('--dest <dir>', '', 'locales')
  .parse(process.argv);

program.cwd = process.cwd();
require('../lib/translate')(program);
