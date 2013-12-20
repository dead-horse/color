/*!
 * color - test/controllers/home.test.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */
var app = require('../../app');
var request = require('supertest')(app);

describe('controllers/home.js', function () {
  before(function (done) {
    app.listen(0, done);
  });
  after(function (done) {
    app.close(done);
  });

  describe('GET /', function () {
    it('should get / ok', function (done) {
      request.get('/')
      .expect(200)
      .expect(/Welcome to webT!/, done);
    });

    it('should get /404 404', function (done) {
      request.get('/404')
      .expect(404, done);
    });
  });
});