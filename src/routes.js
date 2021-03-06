/* eslint-disable linebreak-style */
const logger = require('./logger')();

module.exports = (db) => [
  {
    link: '/health',
    method: 'GET',
    tags: ['Health'],
    description: 'Checks system status',
    responses: {
      200: {
        description: 'OK',
      },
    },
    callback: (_, res) => {
      logger.info('GET /health OK');
      res.send('Healthy');
    },
  },
  {
    link: '/rides',
    method: 'POST',
    tags: ['Rides'],
    description: 'Create new ride in the system',
    parameters: [
      {
        name: 'body',
        in: 'body',
      },
    ],
    responses: {
      200: {
        description: 'New ride is created',
      },
    },
    // eslint-disable-next-line consistent-return
    callback: (req, res) => {
      const startLatitude = Number(req.body.start_lat);
      const startLongitude = Number(req.body.start_long);
      const endLatitude = Number(req.body.end_lat);
      const endLongitude = Number(req.body.end_long);
      const riderName = req.body.rider_name;
      const driverName = req.body.driver_name;
      const driverVehicle = req.body.driver_vehicle;

      if (startLatitude < -90 || startLatitude > 90) {
        if (startLongitude < -180 || startLongitude > 180) {
          logger.error('[VALIDATION_ERROR] Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          return res.status(500).send({
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
          });
        }
      }

      if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        logger.error('[VALIDATION_ERROR] End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
        return res.status(500).send({
          error_code: 'VALIDATION_ERROR',
          message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
        });
      }

      if (typeof riderName !== 'string' || riderName.length < 1) {
        logger.error('[VALIDATION_ERROR] Rider name must be a non empty string');
        return res.status(500).send({
          error_code: 'VALIDATION_ERROR',
          message: 'Rider name must be a non empty string',
        });
      }

      if (typeof driverName !== 'string' || driverName.length < 1) {
        logger.error('VALIDATION_ERROR');
        return res.status(500).send({
          error_code: 'VALIDATION_ERROR',
          message: 'Driver name must be a non empty string',
        });
      }

      if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        logger.error('[VALIDATION_ERROR] Driver vehicle must be a non empty string');
        return res.status(500).send({
          error_code: 'VALIDATION_ERROR',
          message: 'Driver vehicle must be a non empty string',
        });
      }

      const values = [...Object.values(req.body)];

      const fields = 'Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)';
      // eslint-disable-next-line consistent-return
      db.run(`INSERT INTO ${fields} VALUES (?, ?, ?, ?, ?, ?, ?)`, values, function insert(err) {
        if (err) {
          logger.error(`[SERVER_ERROR] ${err}`);
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (err2, rows) => {
          if (err2) {
            logger.error('[SERVER_ERROR] Unknown error');
            return res.status(500).send({
              error_code: 'SERVER_ERROR',
              message: 'Unknown error',
            });
          }

          if (rows.length === 0) {
            logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
            return res.status(500).send({
              error_code: 'RIDES_NOT_FOUND_ERROR',
              message: 'Could not find any rides',
            });
          }

          logger.info('POST /rides New ride is created');
          return res.send(rows);
        });
      });
    },
  },
  {
    link: '/rides',
    method: 'GET',
    tags: ['Rides'],
    description: 'Get all rides from the system',
    parameters: [
      {
        name: 'skip',
        schema: {
          type: 'integer',
        },
        in: 'query',
      },
      {
        name: 'limit',
        schema: {
          type: 'integer',
        },
        in: 'query',
      },
    ],
    responses: {
      200: {
        description: 'OK',
      },
    },
    callback: (req, res) => {
      let query = 'SELECT * FROM Rides';
      if (req.query.limit) {
        query += ` LIMIT ${req.query.limit}`;
      }
      if (req.query.skip) {
        query += ` OFFSET ${req.query.skip}`;
      }

      db.all(query, (err, rows) => {
        if (err) {
          logger.error('[SERVER_ERROR] Unknown error');
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        if (rows.length === 0) {
          logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
          return res.status(500).send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }

        logger.info('GET /rides OK');
        return res.send(rows);
      });
    },
  },
  {
    link: '/rides/:id',
    method: 'GET',
    tags: ['Rides'],
    description: 'Get specific ride from the system',
    parameters: [
      {
        name: 'id',
        schema: {
          type: 'integer',
        },
        in: 'path',
      },
    ],
    responses: {
      200: {
        description: 'OK',
      },
    },
    callback: (req, res) => {
      db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
        if (err) {
          logger.error(`[SERVER_ERROR] ${err}`);
          return res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        if (rows.length === 0) {
          logger.error('[RIDES_NOT_FOUND_ERROR] Could not find any rides');
          return res.status(500).send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }

        logger.info(`GET /rides/${req.params.id} OK`);
        return res.send(rows);
      });
    },
  },
];
