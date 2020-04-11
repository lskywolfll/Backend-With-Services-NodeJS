'use strict';

const Log = require('log');
const rp = require('request-promise');
const path = require('path');
const readYaml = require('read-yaml');

const appProperties = require('../helpers/app.properties');

const log = new Log('debug');
const nameModule = '[config util]';
const CONFIG_PATH_FILE = './config';

function ConfigUtil(host, path) {
  this.host = host;
  this.path = path;
}

ConfigUtil.prototype.loadConfig = function () {

  return new Promise((resolve, reject) => {

    const nameMethod = "loadConfig";

    try {

      const options = {
        url: this.host + this.path,
        json: true
      };

      log.info(`-----> ${nameModule} ${nameMethod} Obtaining config from git with params: options: ${JSON.stringify(options)}`);

      rp.get(options)
        .then(result => {
          log.info(`-----> ${nameModule} ${nameMethod} Config obtained from git SUCCESSFULLY! -> config: ${JSON.stringify(result)}`);
          appProperties.setAppConfig(result);
          resolve(result);
        })
        .catch(err => {
          log.error(`-----> ${nameModule} ${nameMethod} Can not get the configuration from git ${err}`);
          reject(err);
        })
    } catch (err) {
      log.error(`-----> ${nameModule} ${nameMethod} Can not get the configuration from git ${err.stack}`);
      reject(err)
    }
  })
}

ConfigUtil.prototype.loadConfigFromYmlFile = function () {
  return new Promise((resolve, reject) => {
    var nameMethod = "loadConfigFromYmlFile";
    var file = 'application.yml';
    try {
      log.info(`-----> ${nameModule} ${nameMethod} config file: ${file}`);
      const completePathFile = CONFIG_PATH_FILE + path.sep + file;

      readYaml(completePathFile, (error, data) => {
        if (!error) {
          log.info(`-----> ${nameModule} ${nameMethod} OUT --> Configuration got succesfully, result: ${JSON.stringify(data)}`);
          appProperties.setAppConfig(data);
          resolve(data);
        } else {
          log.error(`-----> ${nameModule} ${nameMethod} ERROR --> Can not get the configuration from file, error: ${error.message}`);
          reject(error);
        }
      });
    } catch (error) {
      log.error(`-----> ${nameModule} ${nameMethod} ERROR --> Can not get the configuration from file, error: ${error.message}`);
      reject(error);
    }
  });
}

module.exports = ConfigUtil;
