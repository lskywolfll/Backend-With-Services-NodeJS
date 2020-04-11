'use strict';

const debug = require('debug')('pipes');
const async = require('async');
const _ = require('lodash');
const pipeworks = require('pipeworks');
const helpers = require('../helpers');

// todo: this only currently works with backward references

module.exports = function create(fittingDef, bagpipes) {

  return function parallel(context, cb) {
    debug('create parallel');

    const tasks = {};
    _.each(context.input, function (pipeNameOrDef, key) {
      var pipe = (typeof pipeNameOrDef === 'string')
        ? bagpipes.getPipe(pipeNameOrDef)
        : bagpipes.getPipe(null, pipeNameOrDef);
      tasks[key] = createTask(context, pipe, key);
    });

    async.parallel(tasks, function (err, result) {
      debug('parallel done');
      cb(err, result);
    });
  };
};

function createTask(context, pipe, name) {
  return function execTask(cb) {
    pipeworks()
      .fit(function startParallel(context, next) {
        debug('starting parallel pipe: %s', name);
        pipe.siphon(context, next);
      })
      .fit(function finishParallel(context, ignore) {
        debug('finished parallel pipe: %s', name);
        cb(null, context.output);
      })
      .fault(helpers.faultHandler)
      .flow(context);
  }
}
