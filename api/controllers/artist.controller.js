'use strict';

const Log = require('log');
const appProperties = require('../helpers/app.properties');
const controllerHelper = require('../helpers/controller.helper');
const log = new Log(appProperties.getAppConfig().logLevel);
const nameController = '[Artist Controller]';
const url = require('url');

let artistService = require('../dao/artist.dao');
let blobAzureService = require('../dao/blobAzure.dao');
let dateHelper = require('../helpers/date.helper');
let posibleArtistService = require('../dao/posibleArtist.dao');

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
///////////////////////////////funcion encargada de publicar un posible artista
function putArtistPublishing(req, res) {

    const nameMethod = 'put';
    const requestBody = req.swagger.params.artist.value;
    console.log(requestBody);

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
    console.log(requestBody.v_art_publicado)
    if (requestBody.v_art_publicado === 1) {

        let posibleArtist = {
            v_poa_id_artista: requestBody.v_art_id_artista,
            v_poa_fecha_publicacion: dateHelper.getDate(),
            v_poa_vigencia: 1,
            v_poa_extension_imagen: '',
            v_poa_nombre_imagen: '',
        }
        posibleArtistService.postPosibleArtist(posibleArtist, (response, error) => {
            if (error) {
                controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
            } else {
                let data = response;
                controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
            }
        })
    } else {
        let data = requestBody;
        controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
    }

}



///////////////////////////////////////////
///////////////////////////////funcion encargada de crear un artista
function postArtist(req, res) {

    let nameMethod = 'post';
    let requestBody = req.swagger.params.artist.value;

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);


    blobAzureService.AzureBlobGenerateFile(requestBody.v_codigo_base64, requestBody.v_art_extension_imagen,
        "artistas", (response, error) => {
            if (error) {
                controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
            } else {
                requestBody.v_art_nombre_imagen = response;

                artistService.postArtist(requestBody, (response, error) => {
                    if (error) {
                        controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
                    } else {
                        let data = req.body;
                        controllerHelper.handleCreatedDataResponse(nameController, nameMethod, data, res);
                    }
                });
            }
        })

}

///////////////////////////////////////////
///////////////////////////////funcion encargada de obtener un artista en especifico
function getArtist(req, res) {
    //manera de obtener valores de la url 
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    //saber si se desea obtener todos los artistas vigentes o no. si es undefined se retornaran todos los artistas
    var vigencia = query.vigencia !== undefined ? query.vigencia : 0;


    let nameMethod = 'get';

    log.info(`-----> ${nameController} ${nameMethod}`);

    artistService.getArtist(0, vigencia, (response, error) => {
        if (error) {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        } else {
            let data = { response };
            controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
        }

    })
}

///////////////////////////////////////////
///////////////////////////////funcion encargada de obtener un artista en especifico
function getArtistId(req, res) {

    let nameMethod = 'get';
    let requestBody = req.swagger.params.idArtist.value;
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
    log.info(`-----> ${nameController} ${nameMethod}`);


    artistService.getArtist(requestBody, 0, (response, error) => {
        if (error) {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        } else {
            if (response.length != 0) {

                response = response[0];

                if (response.v_art_nombre_imagen !== "n/a" || response.v_art_nombre_imagen != null) {
                    blobAzureService.AzureBlobGetBase64(response.v_art_nombre_imagen,
                        response.v_art_extension_imagen,
                        "artistas").then(base64 => {

                            response.base64 = base64;

                            log.info(`-----> ${nameController} ${nameMethod}`);
                            let data = { response };
                            controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);

                        }).catch(errorBlob => {
                            controllerHelper.handleErrorResponse(nameController, nameMethod, errorBlob, res);
                        });
                } else {

                    log.info(`-----> ${nameController} ${nameMethod}`);

                    let data = { result };
                    controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
                }

            } else {

                controllerHelper.handleEmptyDataResponse(nameController, nameMethod, "No se encontro artista", res);
            }
        }
    });
}



///////////////////////////////////////////
///////////////////////////////funcion encargada de actualizar un artista en especifico
function putArtist(req, res) {

    let nameMethod = 'put';
    let requestBody = req.swagger.params.artist.value;

    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);


    blobAzureService.AzureBlobGenerateFile(requestBody.v_codigo_base64,
        requestBody.v_art_extension_imagen, "artistas", (response, error) => {
            if (error) {
                controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
            } else {
                requestBody.v_art_nombre_imagen = response;

                artistService.putArtist(requestBody, (response, error) => {
                    if (error) {
                        controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
                    } else {
                        let data = requestBody;
                        controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
                    }
                });
            }
        });
}

///////////////////////////////////////////
///////////////////////////////funcion encargada de obtener un artista en especifico
function deleteArtistId(req, res) {

    let nameMethod = 'delete';
    let requestBody = req.swagger.params.idArtist.value;
    log.info(`-----> ${nameController} ${nameMethod}, (IN) -> ${JSON.stringify(requestBody)}`);
    log.info(`-----> ${nameController} ${nameMethod}`);


    artistService.deleteArtist(requestBody, (response, error) => {
        if (error) {
            controllerHelper.handleErrorResponse(nameController, nameMethod, error, res);
        } else {
            log.info(`-----> ${nameController} ${nameMethod}`);
            let data = { response };
            controllerHelper.handleGenericDataResponse(nameController, nameMethod, data, res);
        }
    })
}


module.exports = {
    postArtist: postArtist,
    getArtist: getArtist,
    getArtistId: getArtistId,
    putArtist: putArtist,
    deleteArtistId: deleteArtistId,
    putArtistPublishing: putArtistPublishing
}

