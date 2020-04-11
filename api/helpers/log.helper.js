// log.helper.js

const Log = require('log-color');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const logSeparator = '**************************************************************************************';

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let logger = new Log({ level: 'debug', color: true });

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// /////////////////////////////////////////////////////////////////////////////

function setTraceLevel(levelIN) {
  logger = new Log({ level: levelIN, color: true });
}

function logInfoBig(nameModule, nameMethod, message) {
  logger.info(`-----> ${nameModule} ${nameMethod} ${logSeparator}`);
  logger.info(`-----> ${nameModule} ${nameMethod} ${message}`);
  logger.info(`-----> ${nameModule} ${nameMethod} ${logSeparator}`);
}

function info(message) {
  logger.info(message);
}

function debug(message) {
  logger.debug(message);
}

function error(message) {
  logger.error(message);
}

module.exports = {

  logSeparator,
  logInfoBig,
  debug,
  info,
  error,
  setTraceLevel,
};
