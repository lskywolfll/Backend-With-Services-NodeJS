'use strict';

const debug = require('debug')('pipes:fittings');

module.exports = function create(fittingDef, bagpipes) {

  debug('swagger security config: %j', fittingDef);

  const swaggerNodeRunner = bagpipes.config.swaggerNodeRunner;
  const middleware = swaggerNodeRunner.swaggerTools.swaggerSecurity(swaggerNodeRunner.swaggerSecurityHandlers);

  return function swagger_security(context, cb) {
    middleware(context.request, context.response, cb);
  }
};
