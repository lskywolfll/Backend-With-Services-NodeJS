'use strict';

const Log               = require('log');
const appProperties     = require('../helpers/app.properties');
const controllerHelper  = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Posible Arist Controller]';
const url = require('url');

const artistService     = require('../dao/artist.dao');
const blobAzureService = require('../dao/blobAzure.dao');
const dateHelper = require('../helpers/date.helper');
const posibleArtistService = require('../dao/posibleArtist.dao');

/************************BITACORA********************************
* Creation Date	: 06/04/2020
* Author		: Jorge Almonacid
* Description   : Se genero el controller de Artist. Se agregaron las funciones de : postArtist, getArtist, getArtistId, putArtist.
*
*****************************************************************
* Update Date   : 
* Author        :
* Description   :
*
**/


///////////////////////////////////////////
///////////////////////////////funcion encargada de crear un posible artista
function postPosibleArtist(req,res) {

    const nameMethod = 'post';
    const requestBody = req.swagger.params.posibleArtist.value;
    console.log(requestBody);

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
        
    let posibleArtist = {
        v_poa_id_artista:requestBody.v_art_id_artista,
        v_poa_fecha_publicacion:dateHelper.getDate(),
        v_poa_vigencia:1,
        v_poa_extension_imagen:'',
        v_poa_nombre_imagen:'',
    }
    posibleArtistService.postPosibleArtist(posibleArtist,(response,error)=>{
        if(error){
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        }else{
            let data = {requestBody};
        controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
        }
    });
}

///////////////////////////////////////////
///////////////////////////////funcion encargada de "eliminar" un posible artista
function deletePosibleArtist(req,res) {

    const nameMethod = 'delete';
    const requestBody = req.swagger.params.posibleArtist.value;
    console.log(requestBody);

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
        
    const posibleArtist = {
        v_poa_id_artista:requestBody.v_art_id_artista,
        v_poa_fecha_publicacion:dateHelper.getDate(),
        v_poa_vigencia:1,
        v_poa_extension_imagen:'',
        v_poa_nombre_imagen:'',
    }
    posibleArtistService.deletePosibleArtist(posibleArtist,(response,error)=>{
        if(error){
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        }else{
            const data = {requestBody};
        controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
        }
    });
}
 


module.exports = {
    
    postPosibleArtist:postPosibleArtist,
    deletePosibleArtist:deletePosibleArtist,
}
