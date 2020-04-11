'use strict';

const Log = require('log');
const _ = require('lodash');

const appProperties = require('../helpers/app.properties');

const log = new Log(appProperties.getAppConfig().logLevel);
const nameModule = "[Controller Helper]";

////////////////////////////////////////////////////////////////////////////////
// HANDLE EVENTS FOR ERRORS
////////////////////////////////////////////////////////////////////////////////

function buildErrorLog(err) {
  let errorLog;
  if (!_.isUndefined(err.stack)) {
    errorLog = err.stack;
  } else if (!_.isUndefined(err)) {
    errorLog = JSON.stringify(err);
  } else {
    errorLog = 'Error not defined';
  }
  return errorLog;
}

function handleErrorResponse(nameController, nameMethod, err, res) {
  log.error(`-----> ${nameController} ${nameMethod} (ERROR) -> Error: ${JSON.stringify(err)} `);

  // When the error is well-formed con the code
  if (!_.isUndefined(err.code)) {
    const jsonResultField = {
      error: err
    };
    res.status(jsonResultField.error.code).send(jsonResultField);
  } else {
    handleGenericErrorResponse(nameController, nameMethod, err, res)
  }
}

function handleGenericErrorResponse(nameController, nameMethod, err, res) {
  log.error(`-----> ${nameController} ${nameMethod} (ERROR) -> Error: ${buildErrorLog(err)} `);

  const jsonResultFailed = {
    error: {
      code: 500,
      message: `Internal Application Error in ${nameMethod}`
    }
  }

  res.status(500).send(jsonResultFailed);
}

function handleGenericDataResponse(nameController, nameMethod, data, res) {
  log.info(`-----> ${nameController} ${nameMethod} (OUT) -> data: ${JSON.stringify(data)} `);
  res.status(200).send(data);
}

function handleCreatedDataResponse(nameController, nameMethod, data, res) {
  log.info(`-----> ${nameController} ${nameMethod} (OUT) -> data: ${JSON.stringify(data)} `);
  res.status(201).send(data);
}

function handleEmptyDataResponse(nameController, nameMethod, data, res) {
  log.info(`-----> ${nameController} ${nameMethod}, (OUT) -> data: ${JSON.stringify(data)} `);
  res.status(204).send();
}

module.exports = {
  handleErrorResponse: handleErrorResponse,
  handleGenericErrorResponse: handleGenericErrorResponse,
  handleGenericDataResponse: handleGenericDataResponse,
  handleCreatedDataResponse: handleCreatedDataResponse,
  handleEmptyDataResponse: handleEmptyDataResponse
};
