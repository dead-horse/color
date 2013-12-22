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

fs.existsSync = fs.existsSync || path.existsSync;
var pkg = require('../package.json');

var root = path.dirname(__dirname);

var config = {
  version: pkg.version,
  webPort: process.env.PORT || 7001,
  enableCluster: false,
  debug: true, // if debug
  viewCache: true,
  sessionSecret: 'input your own sesson secret',
  sessionCookie: 'input your own session cookie',
  logdir: path.join(root, '.tmp', 'logs'),
  qn: {
    accessKey: "you access key",
    secretKey: "your secret key",
    bucket: "your bucket name",
    domain: "your domain"
  },
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

module.exports = config;
