'use strict';

let appconfig;

function setAppConfig(appconfig) {
  this.appconfig = appconfig;
}

function getAppConfig() {
  return this.appconfig;
}

module.exports = {
  setAppConfig: setAppConfig,
  getAppConfig: getAppConfig,
}
