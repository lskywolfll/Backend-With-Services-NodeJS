'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const cors = require('cors');
const Log = require('log');
const helmet = require('helmet');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Implementacion de seguridad con Helmet
app.use(helmet());

const hsts = require('hsts')
app.use(hsts({
  maxAge: 31536000  // 365 days in seconds
}))

const frameguard = require('frameguard')
// Sameorigin for frames:
app.use(frameguard({
  action: 'sameorigin'
}))
// Fin de Implementación de seguridad con Helmet


const ConfigUtil = require('./api/helpers/config.util');

module.exports = app; // for testing

const configHost = process.env.CONFIG_HOST;
const configPath = process.env.CONFIG_PATH;

const log = new Log('info'); // debug, info, error

const nameApp = '[testing back-end application]';

const config = {
  appRoot: __dirname // required config
};

const appConfigUtil = new ConfigUtil(configHost, configPath);

appConfigUtil.loadConfigFromYmlFile()

  .then(() => {

    log.info(`-----> ${nameApp} Initializing Swagger Express...`);
    SwaggerExpress.create(config, function (err, swaggerExpress) {

      if (err) {
        throw err;
      }

      const port = process.env.PORT || 3001;
      log.info(`-----> ${nameApp} started in port: ${port}`);
      if (!module.parent) {
        app.listen(port);
      }

      app.use(cors({
        methods: ["*"]
      }));

      // install middleware
      swaggerExpress.register(app);

    });
  })
  .catch(err => {
    log.error(`-----> ${nameApp} Error: ${err.stack}`);
  });
