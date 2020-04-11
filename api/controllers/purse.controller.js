'use strict';

const Log               = require('log');
const appProperties     = require('../helpers/app.properties');
const controllerHelper  = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Purse Controller]';
const url = require('url');

const purseDao     = require('../dao/purse.dao');
const blobAzureService = require('../dao/blobAzure.dao');
const dateHelper = require('../helpers/date.helper');
const posibleArtistService = require('../dao/posibleArtist.dao');

/************************BITACORA********************************
* Creation Date	: 08/04/2020
* Author		: Michael Mendez
* Description   : Se genero el controller de vacas 
*
*****************************************************************
* Update Date   : 
* Author        :
* Description   :
*
**/

function getPurse(req, res) {
    //manera de obtener valores de la url 
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    //saber si se desea obtener todos los artistas vigentes o no. si es undefined se retornaran todos los artistas
    const vigencia = query.vigencia !== undefined ? query.vigencia : 0;


    const nameMethod = 'get';
   
    log.info(`-----> ${nameController} ${nameMethod}`);
    
    purseDao.getPurse(0,vigencia,(response,error)=>{
        if(error){
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        }else{
            let data = {response};
            controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
        }
 
    })
}

module.exports={
    getPurse:getPurse
}


