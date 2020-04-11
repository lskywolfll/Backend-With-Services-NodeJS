'use strict';

const debug = require('debug')('pipes');
const util = require('util');

module.exports = function create(fittingDef, bagpipes) {

  if (typeof fittingDef.input !== 'string') { throw new Error('input must be a pipe name'); }

  try {
    var pipe = bagpipes.getPipe(fittingDef.input);
  } catch (err) {
    const pipeDef = [ fittingDef.input ];
    pipe = bagpipes.createPipe(pipeDef);
  }

  if (!pipe) {
    const msg = util.format('unknown pipe: %s', context.input);
    console.error(msg);
    throw new Error(msg);
  }

  return function onError(context, cb) {

    debug('setting error handler: %s', context.input);
    context._errorHandler = pipe;
    cb();
  }
};
