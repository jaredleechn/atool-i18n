#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package.json').version, '-v, --version')
  .option('--source <dir>', '', 'i18n-messages')
  .option('--plugins <name|file>', 'defines the plugins should be used')
  .option('--dest <dir>', '', 'locales')
  .parse(process.argv);

require('../lib/translate')({
  source: program.source,
  plugins: program.plugins ? program.plugins.split(',') : [],
  dest: program.dest,
  cwd: process.cwd(),
});
