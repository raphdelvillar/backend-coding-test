'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const logger = require('./logger')();

module.exports = (routes) => {
    routes.map((route) => {
        switch (route.method) {
            case 'POST':
                app.post(route.link, jsonParser, route.callback);
                return;
            case 'PATCH':
                app.patch(route.link, jsonParser, route.callback);
                return;
            case 'PUT':
                app.put(route.link, jsonParser, route.callback);
                return;
            case 'DELETE':
                app.delete(route.link, route.callback);
                return;
            default:
                app.get(route.link, route.callback);
        }
    })

    return app;
};
