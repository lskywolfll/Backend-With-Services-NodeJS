'use strict';

const debug = require('debug')('pipes');

module.exports = function create() {

  return function path(context, cb) {

    const input = context.input;
    const output = _path(input, context.output);
    cb(null, output);
  }
};

function _path(path, obj) {
  if (!obj || !path || !path.length) { return null; }
  const paths = path.split('.');
  const val = obj;
  for (let i = 0, len = paths.length; i < len && val != null; i += 1) {
    val = val[paths[i]];
  }
  return val;
}
