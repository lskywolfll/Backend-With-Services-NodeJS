'use strict';

const Log = require('log');
const appProperties = require('../helpers/app.properties');
const controllerHelper = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Veneu Controller]';

const veneuService = require('../dao/veneu.dao.js');

function create(req, res) {

    let nameMethod = 'create';
    let requestBody = req.swagger.params.veneu.value
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);

    veneuService
        .createVeneu(requestBody)
        .then(result => {
            log.info(`-----> ${nameController} ${nameMethod} Checking response after call service -> ${JSON.stringify(result)}`);
            let data = { result };
            controllerHelper.handleCreatedDataResponse(nameController, nameMethod, data, res);
        })
        .catch(err => {
            controllerHelper.handleErrorResponse(nameController, nameMethod, err, res);
        });
}

module.exports = {
    create: create,
}
