/* eslint-disable linebreak-style */
const logger = require('../../logger');

module.exports = class RideDto {
    data = {
      start_lat: 0,
      start_long: 0,
      end_lat: 0,
      end_long: 0,
      rider_name: '',
      driver_name: '',
      driver_vehicle: '',
    };

    constructor(data) {
      this.data = Object.assign(this.data, data);
      this.validate();
    }

    validate() {
      if (this.data.start_lat < -90 || this.data.start_lat > 90) {
        if (this.data.start_long < -180 || this.data.start_long > 180) {
          logger.error('[VALIDATION_ERROR] Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          throw new Error('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        }
      }

      if (this.data.end_lat < -90 || this.data.end_lat > 90) {
        if (this.data.end_long < -180 || this.data.end_long > 180) {
          logger.error('[VALIDATION_ERROR] End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          throw new Error('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        }
      }

      if (!this.data.rider_name || typeof this.data.rider_name !== 'string') {
        logger.error('[VALIDATION_ERROR] Rider name must be a non empty string');
        throw new Error('Rider name must be a non empty string');
      }

      if (!this.data.driver_name || typeof this.data.driver_name !== 'string') {
        logger.error('[VALIDATION_ERROR] Driver name must be a non empty string');
        throw new Error('Driver name must be a non empty string');
      }

      if (!this.data.driver_vehicle || typeof this.data.driver_vehicle !== 'string') {
        logger.error('[VALIDATION_ERROR] Driver vehicle must be a non empty string');
        throw new Error('Driver vehicle must be a non empty string');
      }
    }
};
