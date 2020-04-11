'use strict';

const _ = require('lodash');
const debug = require('debug')('pipes');

module.exports = function create() {

  return function omit(context, cb) {

    const input = context.input;

    if (Array.isArray(context.output)) {
      cb(null, _.map(context.output, _.partialRight(_.omit, input)));
    } else {
      cb(null, _.omit(context.output, input));
    }
  }
};
