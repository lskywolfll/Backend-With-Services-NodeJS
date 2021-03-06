'use strict';

const debug = require('debug')('pipes');

module.exports = function create() {

  return function emit(context, cb) {

    cb(null, context.input);
  }
};
