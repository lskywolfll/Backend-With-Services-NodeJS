'use strict';

const debug = require('debug')('pipes:fittings');
const YAML = require('js-yaml');
const _ = require('lodash');

// default filter just drops all the x- labels
const DROP_SWAGGER_EXTENSIONS = /^(?!x-.*)/;

module.exports = function create(fittingDef, bagpipes) {

  const filter = DROP_SWAGGER_EXTENSIONS;
  if (fittingDef.filter) {
    filter = new RegExp(fittingDef.filter);
  }
  debug('swagger doc filter: %s', filter);
  const filteredSwagger = filterKeysRecursive(bagpipes.config.swaggerNodeRunner.swagger, filter);

  // should this just be based on accept type?
  const yaml = YAML.safeDump(filteredSwagger, { indent: 2 });
  const json = JSON.stringify(filteredSwagger, null, 2);

  return function swagger_raw(context, next) {

    const req = context.request;

    const accept = req.headers['accept'];
    if (accept && accept.indexOf('yaml') != -1) {
      context.headers['Content-Type'] = 'application/yaml';
      next(null, yaml);
    } else {
      context.headers['Content-Type'] = 'application/json';
      next(null, json);
    }
  }
};

function filterKeysRecursive(object, regex) {
  if (_.isPlainObject(object)) {
    const result = {};
    _.each(object, function (value, key) {
      if (regex.test(key)) {
        result[key] = filterKeysRecursive(value, regex);
      }
    });
    return result;
  }
  return object;
}
