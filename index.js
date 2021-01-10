/* eslint linebreak-style: ["error", "windows"] */
const express = require('express');
const sqlinjection = require('sql-injection');

const path = require('path');

const port = 8010;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const swaggerUi = require('swagger-ui-express');

const buildSwagger = require('./src/swagger');

const routes = require('./src/routes')(db);

const logger = require('./src/logger');

logger.info('Building Swagger');
buildSwagger(port, routes);
const swaggerDocument = require('./swagger.json');

const app = require('./src/app')(routes);

db.serialize(() => {
  app.use(sqlinjection);
  app.use(express.static('docs'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  logger.info('Building Esdocs');
  app.get('/', (_, res) => {
    res.sendFile(path.join(`${__dirname}/docs/index.html`));
  });

  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
