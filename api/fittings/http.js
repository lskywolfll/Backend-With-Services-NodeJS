'use strict';

const debug = require('debug')('pipes');
const _ = require('lodash');
const Http = require('machinepack-http');

// defaults output -> url
module.exports = function create(fittingDef) {

  const config = _.extend({ baseUrl: '' }, fittingDef.config);

  return function http(context, cb) {

    const input = (typeof context.input === 'string') ? { url: context.input } : context.input;

    const options = _.extend({ url: context.output }, input, config);

    Http.sendHttpRequest(options, cb);
  }
};

/* input:
 url: '/pets/18',
 baseUrl: 'http://google.com',
 method: 'get',
 params: {},
 headers: {}
 */
