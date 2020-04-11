'use strict';

const debug = require('debug')('pipes');
const JSPath = require('jspath');

module.exports = function create() {

  return function path(context, cb) {

    const input = context.input;
    const output = JSPath.apply(input, context.output);
    cb(null, output);
  }
};
