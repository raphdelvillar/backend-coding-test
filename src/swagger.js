/* eslint-disable linebreak-style */
const fs = require('fs');
const logger = require('./logger')();

const pjson = require('../package.json');

module.exports = (port, routes) => {
  const data = {
    swagger: '2.0',
    info: {
      version: pjson.version,
      title: pjson.name,
      description: pjson.description,
    },
    host: `localhost:${port}`,
    basePath: '',
    tags: [],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {},
  };

  routes.map((route) => {
    if (data.paths[route.link] == null) {
      data.paths[route.link] = {};
    }

    data.paths[route.link][route.method.toLowerCase()] = {
      tags: route.tags,
      summary: route.description,
      responses: route.responses,
      requestBody: route.requestBody,
      parameters: route.parameters,
    };

    return route;
  });

  fs.writeFileSync('swagger.json', JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      logger.error(err);
      throw err;
    }
  });
};
