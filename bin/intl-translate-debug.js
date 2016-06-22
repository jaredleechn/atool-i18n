#!/usr/bin/env node
const path = require('path');

require('devtool/bin/spawn')([
  path.join(__dirname, './intl-translate.js'),
].concat(process.argv.slice(2)));
