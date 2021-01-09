'use strict';

const express = require('express');
const path = require('path');
const port = 8010;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const swaggerUi = require('swagger-ui-express');

const buildSchemas = require('./src/schemas');
const buildSwagger = require('./src/swagger');

db.serialize(() => {

    buildSchemas(db);

    const routes = require('./src/routes')(db);
    buildSwagger(port,routes);

    const app = require('./src/app')(routes);

    app.use(express.static('docs'))

    const swaggerDocument = require('./swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.get('/', (_, res) => {
        res.sendFile(path.join(__dirname + '/docs/index.html'));
    })

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});