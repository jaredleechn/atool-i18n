#!/usr/bin/env node

const program = require('commander');
const path = require('path');

program
  .version(require('../package.json').version, '-v, --version')
  .option('--config <dir>', 'where is the config file, default is intl.config.js', 'intl.config.js')
  .parse(process.argv);

const defaultOptions = {
  cwd: process.cwd(),
};

const configFunc = program.config ? require(path.join(process.cwd(), program.config)) : false;

require('../lib/translate')(configFunc
  ? configFunc(defaultOptions)
  : defaultOptions
);
