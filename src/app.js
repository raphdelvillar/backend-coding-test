/* eslint-disable linebreak-style */

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

module.exports = (routes) => {
  routes.map((route) => {
    switch (route.method) {
      case 'POST':
        app.post(route.link, jsonParser, route.callback);
        break;
      case 'PATCH':
        app.patch(route.link, jsonParser, route.callback);
        break;
      case 'PUT':
        app.put(route.link, jsonParser, route.callback);
        break;
      case 'DELETE':
        app.delete(route.link, route.callback);
        break;
      default:
        app.get(route.link, route.callback);
    }
    return route;
  });

  return app;
};
