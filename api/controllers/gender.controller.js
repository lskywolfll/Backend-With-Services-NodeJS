'use strict';
const Log               = require('log');
const appProperties     = require('../helpers/app.properties');
const controllerHelper  = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Gender Controller]';

const genderService   = require('../dao/gender.dao');

/************************BITACORA********************************
* Creation Date	: 06/04/2020
* Author		: Jorge Almonacid
* Description   : Se genero el service de Genders. Se agregaron las funciones de : getGenders.
*
*****************************************************************
* Update Date   : 
* Author        :
* Description   :
*
**/

//funcion encargada de obtener todos los generos
function getGenders(req, res) {

    const nameMethod = 'get';
    //let requestBody = req.swagger.params.veneu.value
    //log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);


    log.info(`-----> ${nameController} ${nameMethod}`);

    genderService
        .getGenders()
            .then(result => {
                log.info(`-----> ${nameController} ${nameMethod} Checking response after call service -> ${JSON.stringify(result)}`);
                let data = {result};
                controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
            })
            .catch(err => {
                controllerHelper.handleErrorResponse(nameController, nameMethod, err, res);
            });
}

module.exports = {
    getGenders: getGenders,
}
