/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
const logger = require('../logger');

module.exports = class HealthController {
  async health(_, res) {
    logger.info('GET /health OK');
    return res.send('Healthy');
  }
};
