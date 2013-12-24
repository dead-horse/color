/*!
 * color - controllers/file.js 
 * Copyright(c) 2013 
 * Author: dead_horse <dead_horse@qq.com>
 */

'use strict';

/**
 * Module dependencies.
 */

var config = require('../config');
var qn = require('../common/qn');
var debug = require('debug')('color:controllers/file');
var IncomingForm = require('formidable').IncomingForm;
var rimraf = require('rimraf');
var path = require('path');
var utility = require('utility');

exports.upload = function (req, res, next) {
  var form = new IncomingForm();
  form.uploadDir = config.uploadDir;
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }
    var file = files.file;
    if (!file || !file.path) {
      return res.json(403, {
        ok: false,
        message: 'file needed, and must be jpg or png'
      });
    }
    var type = file.type ? '.' + file.type.split('/')[1] : path.extname(file.name);
    qn.uploadFile(file.path, {
      key: path.basename(file.path) + type
    }, function (err, data) {
      rimraf(file.path, utility.noop);
      if (err) {
        return next(err);
      }
      res.json({
        ok: !!data.url,
        url: data.url || ''
      });
    });
  });
  form.onPart = function (part) {
    console.log(part);
    if (part.filename && 
        part.name === 'file' && 
        (part.mime === 'image/png' || part.mime === 'image/jpeg')) {
      form.handlePart(part);
    }
  };
};

exports.show = function (req, res) {
  res.render('/upload');
};
