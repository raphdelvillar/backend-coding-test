/* eslint-disable linebreak-style */
const logger = require('../logger');
const RideDto = require('./dto/ride.dto');
const RideService = require('./service');

module.exports = class RideController {
  constructor(db) {
    this.db = new RideService(db);
  }

  async findAll(req, res) {
    try {
      const result = await this.db.findAll(req.query);

      if (!result || result.length === 0) {
        logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
        return res.status(500).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      logger.info('GET /rides OK');
      return res.send(result);
    } catch (err) {
      logger.error(`[SERVER_ERROR] ${err}`);
      return res.status(500).send({
        error_code: 'SERVER_ERROR',
        message: `${err}`,
      });
    }
  }

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const result = await this.db.findOne(id);
      if (!result || Object.keys(result).length === 0) {
        logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
        return res.status(500).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      logger.info(`GET /rides/${id} OK`);
      return res.send(result);
    } catch (err) {
      logger.error(`[SERVER_ERROR] ${err}`);
      return res.status(500).send({
        error_code: 'SERVER_ERROR',
        message: `${err}`,
      });
    }
  }

  async create(req, res) {
    try {
      const ride = new RideDto(req.body);
      const result = await this.db.create(ride.data);

      if (!result || result.length === 0) {
        logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
        return res.status(500).send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      logger.info('POST /rides New ride is created');
      return res.send(result);
    } catch (err) {
      logger.error(`[SERVER_ERROR] ${err}`);
      return res.status(500).send({
        error_code: 'SERVER_ERROR',
        message: `${err}`,
      });
    }
  }
};
