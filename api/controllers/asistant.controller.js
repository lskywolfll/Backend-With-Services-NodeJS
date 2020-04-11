'use strict';

const Log = require('log');
const appProperties = require('../helpers/app.properties');
const controllerHelper = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Asistant Controller]';
const url = require('url');

const asistantService = require('../dao/asistant.dao');
/************************BITACORA********************************
* Creation Date	: 10/04/2020
* Author		: René Sanchez
* Description   : Se genero el controller de Asistenets. Se agregaron las funciones de : postAsistant, getAsistant, getAsistantId, putAsistant.
*
*****************************************************************
**/

function putAsistantId(req, res) {

    const nameMethod = 'put';
    const requestBody = req.swagger.params.asistant.value;
    const requestParams = req.swagger.params.idAsistant.value;

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> idAsistant:${JSON.stringify(requestParams)}`);
    
    asistantService.putAsistant(requestParams, requestBody)
        .then(resp => {
            controllerHelper.handleCreatedDataResponse(nameController, nameMethod, resp, res);
        })
        .catch(error => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        });

}

function postAsistant(req, res) {

    const nameMethod = 'post';
    const requestBody = req.swagger.params.asistant.value;

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);

    asistantService.postAsistant(requestBody)
        .then(resp => {
            controllerHelper.handleCreatedDataResponse(nameController, nameMethod, resp, res);
        })
        .catch(error => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        });
}

function getAsistant(req, res) {
    const nameMethod = 'get';

    log.info(`-----> ${nameController} ${nameMethod}`);

    asistantService.getAllAsistant()
        .then(resp => {
            controllerHelper.handleCreatedDataResponse(nameController, nameMethod, resp, res);
        })
        .catch(error => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, err, res);
        })
}

function getAsistantId(req, res) {

    const nameMethod = 'get';
    const requestParams = req.swagger.params.idAsistant.value;
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestParams)}`);

    asistantService.getAsistant(requestParams)
        .then(resp => {
            controllerHelper.handleGenericDataResponse(nameController, nameMethod, resp, res);
        })
        .catch(error => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        });
}

function deleteAsistantId(req, res) {

    const nameMethod = 'delete';
    const requestBody = req.swagger.params.idAsistant.value;
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
    log.info(`-----> ${nameController} ${nameMethod}`);

    asistantService.deleteAsistant(requestBody)
        .then(resp => {
            controllerHelper.handleGenericDataResponse(nameController, nameMethod, resp, res);
        })
        .catch(error => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        });
}

module.exports = {
    postAsistant,
    deleteAsistantId,
    putAsistantId,
    getAsistantId,
    getAsistant,
}