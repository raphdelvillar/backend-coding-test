/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const routes = require('../src/routes')(db);
const app = require('../src/app')(routes);
const buildSchemas = require('../src/schemas');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);
describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }
      buildSchemas(db);
      return done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      chai.request(app)
        .get('/health')
        .end((_, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('POST /rides', () => {
    it('should return [VALIDATION_ERROR] Rider name must be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({})
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('VALIDATION_ERROR');
          res.body.should.have.property('message').eql('Rider name must be a non empty string');
          done();
        });
    });

    it('should return [VALIDATION_ERROR] Driver name must not be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          rider_name: 'Rider',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('VALIDATION_ERROR');
          res.body.should.have.property('message').eql('Driver name must be a non empty string');
          done();
        });
    });

    it('should return [VALIDATION_ERROR] Driver vehicle must be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          rider_name: 'Rider',
          driver_name: 'Driver',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('VALIDATION_ERROR');
          res.body.should.have.property('message').eql('Driver vehicle must be a non empty string');
          done();
        });
    });

    it('should return [VALIDATION_ERROR] Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          start_lat: -100,
          start_long: -190,
          rider_name: 'Rider',
          driver_name: 'Driver',
          driver_vehicle: 'Car',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('VALIDATION_ERROR');
          res.body.should.have.property('message').eql('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          done();
        });
    });

    it('should return [VALIDATION_ERROR] End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          start_lat: 0,
          start_long: 0,
          end_lat: -100,
          end_long: -190,
          rider_name: 'Rider',
          driver_name: 'Driver',
          driver_vehicle: 'Car',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('VALIDATION_ERROR');
          res.body.should.have.property('message').eql('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          done();
        });
    });

    it('should return rows', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          start_lat: 0,
          start_long: 0,
          end_lat: 0,
          end_long: 0,
          rider_name: 'Rider',
          driver_name: 'Driver',
          driver_vehicle: 'Car',
        })
        .end((_, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET /rides', () => {
    it('should return rows', (done) => {
      chai.request(app)
        .get('/rides')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('GET /rides/:id', () => {
    it('should return rows', (done) => {
      request(app)
        .get('/rides/1')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('should return [RIDES_NOT_FOUND_ERROR] Could not find any rides', (done) => {
      request(app)
        .get('/rides/0')
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('RIDES_NOT_FOUND_ERROR');
          res.body.should.have.property('message').eql('Could not find any rides');
          done();
        });
    });
  });
});
