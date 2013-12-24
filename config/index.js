/*!
 * color - config/index.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

fs.existsSync = fs.existsSync || path.existsSync;
var pkg = require('../package.json');

var root = path.dirname(__dirname);

var debug = process.env.debug;
if (debug === 0 || debug === false || debug === '0' || debug === 'false') {
  debug = false;
} else {
  debug = true;
}

var config = {
  version: pkg.version,
  webPort: process.env.PORT || 7001,
  enableCluster: false,
  debug: debug,
  viewCache: true,
  logdir: path.join(root, '.tmp', 'logs'),
  qn: {
    accessKey: process.env.qnAccessKey,
    secretKey: process.env.qnSecretKey,
    bucket: process.env.qnBucket,
    domain: process.env.qnDomain
  },
  uploadDir: path.join(root, '.tmp', 'upload'),
  maxRequestSize: 5 * 1024 * 1024
};
  
// load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  var options = require(customConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

mkdirp.sync(config.logdir);
rimraf.sync(config.uploadDir);
mkdirp.sync(config.uploadDir);

module.exports = config;
