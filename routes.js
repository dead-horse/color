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

module.exports = function (app) {
  app.get('/', home);
};
