/*!
 * color - routes.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var home = require('./controllers/home');
var file = require('./controllers/file');

module.exports = function (app) {
  app.get('/', home);
  app.post('/files', file.upload);
  app.get('/files/:id', file.get);
};
