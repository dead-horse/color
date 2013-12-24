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
var fs = require('fs');
var mime = require('connect').mime;

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
    var newPath = file.path + type;
    fs.rename(file.path, newPath, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({
        ok: true,
        url: '/files/' + path.basename(newPath)
      });
    });
  });
  form.onPart = function (part) {
    if (part.filename && 
        part.name === 'file' && 
        (part.mime === 'image/png' || part.mime === 'image/jpeg')) {
      form.handlePart(part);
    }
  };
};

exports.get = function (req, res, next) {
  var id = req.params.id;
  var imgPath = path.join(config.uploadDir, id);
  var imgStream = fs.createReadStream(imgPath);
  res.setHeader('Content-type', mime.lookup(path.extname(id)));
  imgStream.pipe(res);
  // imgStream.once('end', function () {
  //   rimraf(imgPath, utility.noop);
  // });
};
