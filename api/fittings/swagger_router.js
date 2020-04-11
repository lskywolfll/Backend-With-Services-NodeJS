'use strict';

const debug = require('debug')('pipes:fittings');
const path = require('path');
const assert = require('assert');

module.exports = function create(fittingDef, pipes) {

  assert(Array.isArray(fittingDef.controllersDirs), 'controllersDirs must be an array');
  assert(Array.isArray(fittingDef.mockControllersDirs), 'mockControllersDirs must be an array');

  const swaggerNodeRunner = pipes.config.swaggerNodeRunner;
  const appRoot = swaggerNodeRunner.config.swagger.appRoot;

  const mockMode = !!fittingDef.mockMode || !!swaggerNodeRunner.config.swagger.mockMode;

  let controllers = mockMode ? fittingDef.mockControllersDirs : fittingDef.controllersDirs;

  controllers = controllers.map(function(dir) {
    return path.resolve(appRoot, dir);
  });

  const routerConfig = {
    useStubs: mockMode,
    controllers: controllers
  };
  debug('swaggerTools router config: %j', routerConfig);
  const middleware = swaggerNodeRunner.swaggerTools.swaggerRouter(routerConfig);

  return function swagger_router(context, cb) {
    middleware(context.request, context.response, cb);
  }
};
