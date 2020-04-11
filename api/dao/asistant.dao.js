'use strict';

const Log = require('log');
const _ = require('lodash');
const appProperties = require('../helpers/app.properties');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameModule = '[Asistant Service]';

const { SqlConnection, sql } = require('../../connection/ConnectionSqlServer');

/************************BITACORA********************************
* Creation Date	: 11/04/2020
* Author		: René Sanchez
* Description   : Se genero el service de Asistant. Se agregaron las funciones de : createAsistant, getAsistant, updateAsistant y deleteAsistant.
*
*****************************************************************
**/

async function postAsistant(requestBody) {
    try {
        log.info(`***************************************************************************************************************`);
        log.info(`-----> ${nameModule} ${postAsistant.name} (IN) -> ${JSON.stringify(requestBody)}`);
        log.info(`***************************************************************************************************************`);

        const { 
            firstName, 
            avatarUrl, 
            email, 
            jobTitle,
            lastName,
            twitter
         } = _.pick(requestBody, ['firstName', 'lastName', 'email', 'jobTitle', 'twitter', 'avatarUrl']);

         const conexion = await SqlConnection;
         const request = await conexion.request()
            .input('FIRSTNAME', sql.VarChar , firstName)
            .input('LASTNAME', sql.VarChar , lastName)
            .input('EMAIL', sql.VarChar, email)
            .input('JOBTITLE', sql.VarChar, jobTitle)
            .input('TWITTER', sql.VarChar, twitter)
            .input('AVATARURL', sql.VarChar, avatarUrl);
         const resultado = await request.execute('INSERTAR_ASISTENTE');

         return resultado;
    } catch (err) {
        log.error(`-----> ${nameModule} ${postAsistant.name} (ERROR) -> Global generic error: ${JSON.stringify(err.stack)}`);
        return err;
    }

}

async function getAsistant(idAsistant) {
    try {
        log.info(`***************************************************************************************************************`);
        log.info(`-----> ${nameModule} ${getAsistant.name}`);
        log.info(`***************************************************************************************************************`);

        const conexion = await SqlConnection;
        const request = await conexion.request()
            .input('ID_ASISTANT', idAsistant);
        const resultado = await request.execute('CONSULTAR_ASISTANT_POR_ID');

        return resultado;

    } catch (err) {
        log.error(`-----> ${nameModule} ${getAsistant.name} (ERROR) -> Global generic error: ${JSON.stringify(err.stack)}`);
        return err;
    }

}

async function getAllAsistant() {
    try {
        log.info(`***************************************************************************************************************`);
        log.info(`-----> ${nameModule} ${getAllAsistant.name}`);
        log.info(`***************************************************************************************************************`);

        const conexion = await SqlConnection;
        const request = await conexion.request();
        const resultado = await request.execute('CONSULTAR_ASISTANTS');

        return resultado;

    } catch (err) {
        log.error(`-----> ${nameModule} ${getAllAsistant.name} (ERROR) -> Global generic error: ${JSON.stringify(err.stack)}`);
        return err;
    }

}

async function putAsistant(idAsistant, requestBody) {
    try {
        log.info(`***************************************************************************************************************`);
        log.info(`-----> ${nameModule} ${putAsistant.name}`);
        log.info(`***************************************************************************************************************`);

        const { 
            firstName, 
            email, 
            jobTitle,
            lastName,
            twitter
         } = _.pick(requestBody, ['firstName', 'lastName', 'email', 'jobTitle', 'twitter']);

         const conexion = await SqlConnection;
         const request = await conexion.request()
            .input('ID_ASISTANT', idAsistant)
            .input('FIRSTNAME', firstName)
            .input('LASTNAME', lastName)
            .input('EMAIL', email)
            .input('JOBTITLE', jobTitle)
            .input('TWITTER', twitter)
        const resultado = await request.execute('ACTUALIZAR_ASISTANT_POR_ID');

        return resultado;
    } catch (err) {
        log.error(`-----> ${nameModule} ${putAsistant.name} (ERROR) -> Global generic error: ${JSON.stringify(err.stack)}`);
        return err;
    }

}

async function deleteAsistant(idAsistant) {
    try {
        log.info(`***************************************************************************************************************`);
        log.info(`-----> ${nameModule} ${deleteAsistant.name}`);
        log.info(`***************************************************************************************************************`);

        const conexion = await SqlConnection;
        const request = await conexion.request()
            .input('ID_ASISTANT', idAsistant);
        const resultado = await request.execute('ELIMINAR_ASISTANT_POR_ID');

        return resultado;
    } catch (err) {
        log.error(`-----> ${nameModule} ${deleteAsistant.name} (ERROR) -> Global generic error: ${JSON.stringify(err.stack)}`);
        return err;
    }

}

module.exports = {
    postAsistant,
    deleteAsistant,
    putAsistant,
    getAllAsistant,
    getAsistant
};
