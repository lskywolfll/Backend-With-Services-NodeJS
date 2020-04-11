'use strict';

const debug = require('debug')('pipes:fittings');
const CORS = require('cors');

// config options: https://www.npmjs.com/package/cors

module.exports = function create(fittingDef) {

  debug('cors config: %j', fittingDef);
  var middleware = CORS(fittingDef);

  return function cors(context, cb) {
    debug('cors exec');
    middleware(context.request, context.response, cb);
  }
};
