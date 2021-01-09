'use strict';

const logger = require('./logger')();

module.exports = (db) => {
    return [
        {
            link: '/health',
            method: 'GET',
            tags: ['Health'],
            description: 'Checks system status',
            responses: {
                200: {
                    description: 'OK'
                },
            },
            callback: (_, res) => {
                logger.info('GET /health OK');
                res.send('Healthy');
            }
        },
        {
            link: '/rides',
            method: 'POST',
            tags: ['Rides'],
            description: 'Create new ride in the system',
            parameters: [
                {
                    name: 'body',
                    in: 'body'
                },
            ],
            responses: {
                200: {
                    description: 'New ride is created'
                },
            },
            callback: (req, res) => {
                const startLatitude = Number(req.body.start_lat);
                const startLongitude = Number(req.body.start_long);
                const endLatitude = Number(req.body.end_lat);
                const endLongitude = Number(req.body.end_long);
                const riderName = req.body.rider_name;
                const driverName = req.body.driver_name;
                const driverVehicle = req.body.driver_vehicle;

                if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
                    logger.error('VALIDATION_ERROR');
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    });
                }

                if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
                    logger.error('VALIDATION_ERROR');
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                    });
                }

                if (typeof riderName !== 'string' || riderName.length < 1) {
                    logger.error('VALIDATION_ERROR');
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }

                if (typeof driverName !== 'string' || driverName.length < 1) {
                    logger.error('VALIDATION_ERROR');
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }

                if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
                    logger.error('VALIDATION_ERROR');
                    return res.send({
                        error_code: 'VALIDATION_ERROR',
                        message: 'Rider name must be a non empty string'
                    });
                }

                var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

                const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
                    if (err) {
                        logger.error('SERVER_ERROR');
                        return res.send({
                            error_code: 'SERVER_ERROR',
                            message: 'Unknown error'
                        });
                    }

                    db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                        if (err) {
                            logger.error('SERVER_ERROR');
                            return res.send({
                                error_code: 'SERVER_ERROR',
                                message: 'Unknown error'
                            });
                        }

                        logger.info('POST /rides New ride is created');
                        res.send(rows);
                    });
                });
            }
        },
        {
            link: '/rides',
            method: 'GET',
            tags: ['Rides'],
            description: 'Get all rides from the system',
            responses: {
                200: {
                    description: 'OK'
                },
            },
            callback: (_, res) => {
                db.all('SELECT * FROM Rides', function (err, rows) {
                    if (err) {
                        logger.error('SERVER_ERROR');
                        return res.send({
                            error_code: 'SERVER_ERROR',
                            message: 'Unknown error'
                        });
                    }

                    if (rows.length === 0) {
                        logger.error('RIDES_NOT_FOUND_ERROR');
                        return res.send({
                            error_code: 'RIDES_NOT_FOUND_ERROR',
                            message: 'Could not find any rides'
                        });
                    }

                    logger.info('GET /rides OK')
                    res.send(rows);
                });
            }
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
                        type: 'integer'
                    },
                    in: 'path'
                },
            ],
            responses: {
                200: {
                    description: 'OK'
                },
            },
            callback: (req, res) => {
                db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
                    if (err) {
                        logger.error('SERVER_ERROR');
                        return res.send({
                            error_code: 'SERVER_ERROR',
                            message: 'Unknown error'
                        });
                    }

                    if (rows.length === 0) {
                        logger.error('RIDES_NOT_FOUND_ERROR');
                        return res.send({
                            error_code: 'RIDES_NOT_FOUND_ERROR',
                            message: 'Could not find any rides'
                        });
                    }

                    logger.info(`GET /rides/${req.parms.id} OK`)
                    res.send(rows);
                });
            }
        },
    ];
}