'use strict';

const express = require('express');
const path = require('path');
const port = 8010;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const swaggerUi = require('swagger-ui-express');

const buildSchemas = require('./src/schemas');
const buildSwagger = require('./src/swagger');

const routes = require('./src/routes')(db);

const logger = require('./src/logger')();

db.serialize(() => {
    
    logger.info('Building schemas');
    buildSchemas(db);

    logger.info('Building Swagger');
    buildSwagger(port,routes);

    const app = require('./src/app')(routes);
    app.use(express.static('docs'))

    const swaggerDocument = require('./swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    
    logger.info('Building Esdocs');
    app.get('/', (_, res) => {
        res.sendFile(path.join(__dirname + '/docs/index.html'));
    })

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});