'use strict';

const Log = require('log');
const appProperties = require('../helpers/app.properties');
const controllerHelper = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Example Controller]';

function hello(req, res) {
    const nameMethod = 'hello';
    const parameters = {
        name: req.swagger.params.name.value
    };
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(parameters)}`);
    controllerHelper.handleGenericDataResponse(nameController, nameMethod, { message: 'Hola' }, res);
}

module.exports = {
    hello: hello,
}
