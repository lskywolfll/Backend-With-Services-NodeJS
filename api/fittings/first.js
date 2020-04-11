'use strict';

const _ = require('lodash');
const debug = require('debug')('pipes');

module.exports = function create() {

  return function first(context, cb) {

    cb(null, _.first(context.output));
  }
};
