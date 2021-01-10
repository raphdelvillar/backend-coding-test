/* eslint-disable linebreak-style */
const enums = require('./enums')();
const HealthController = require('./health/controller');
const RideController = require('./ride/controller');

module.exports = (db) => {
  const healthController = new HealthController(db);
  const rideController = new RideController(db);
  return [
    {
      link: '/health',
      method: enums.methods.GET,
      tags: ['Health'],
      description: 'Checks system status',
      responses: {
        200: {
          description: 'OK',
        },
      },
      callback: async (_, res) => {
        const result = await healthController.health(_, res);
        return result;
      },
    },
    {
      link: '/rides',
      method: enums.methods.POST,
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
      callback: async (req, res) => {
        const result = await rideController.create(req, res);
        return result;
      },
    },
    {
      link: '/rides',
      method: enums.methods.GET,
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
      callback: async (req, res) => {
        const result = await rideController.findAll(req, res);
        return result;
      },
    },
    {
      link: '/rides/:id',
      method: enums.methods.GET,
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
      callback: async (req, res) => {
        const result = await rideController.findOne(req, res);
        return result;
      },
    },
  ];
};
