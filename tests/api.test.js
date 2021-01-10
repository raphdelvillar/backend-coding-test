/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const routes = require('../src/routes')(db);
const app = require('../src/app')(routes);

const logger = require('../src/logger');

logger.toggle(false);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Logger tests', () => {
  describe('Logger info', () => {
    it('should enable info', (done) => {
      logger.toggle(true);
      logger.enabled.should.be.eql(true);
      logger.info('test');
      return done();
    });

    it('should enable error', (done) => {
      logger.toggle(true);
      logger.enabled.should.be.eql(true);
      logger.error('test');
      return done();
    });

    it('should enable info', (done) => {
      logger.toggle(false);
      logger.enabled.should.be.eql(false);
      logger.info('test');
      return done();
    });

    it('should enable error', (done) => {
      logger.toggle(false);
      logger.enabled.should.be.eql(false);
      logger.error('test');
      return done();
    });
  });
});

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }
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

  describe('GET /rides', () => {
    it('should return [RIDES_NOT_FOUND_ERROR] Could not find any rides', (done) => {
      request(app)
        .get('/rides')
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('RIDES_NOT_FOUND_ERROR');
          res.body.should.have.property('message').eql('Could not find any rides');
          done();
        });
    });
  });

  describe('POST /rides', () => {
    it('should return [SERVER_ERROR] Error: Rider name must be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({})
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('SERVER_ERROR');
          res.body.should.have.property('message').eql('Error: Rider name must be a non empty string');
          done();
        });
    });

    it('should return [SERVER_ERROR] Error: Driver name must be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          rider_name: 'Rider',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('SERVER_ERROR');
          res.body.should.have.property('message').eql('Error: Driver name must be a non empty string');
          done();
        });
    });

    it('should return [SERVER_ERROR] Error: Driver vehicle must be a non empty string', (done) => {
      chai.request(app)
        .post('/rides')
        .send({
          rider_name: 'Rider',
          driver_name: 'Driver',
        })
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('SERVER_ERROR');
          res.body.should.have.property('message').eql('Error: Driver vehicle must be a non empty string');
          done();
        });
    });

    it('should return [SERVER_ERROR] Error: Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', (done) => {
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
          res.body.should.have.property('error_code').eql('SERVER_ERROR');
          res.body.should.have.property('message').eql('Error: Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
          done();
        });
    });

    it('should return [SERVER_ERROR] Error: End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', (done) => {
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
          res.body.should.have.property('error_code').eql('SERVER_ERROR');
          res.body.should.have.property('message').eql('Error: End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
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
          res.body.should.be.a('object');
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
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return rows with pagination', (done) => {
      chai.request(app)
        .get('/rides?skip=1&limit=1')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          res.body[0].should.have.property('ride_id').eql(2);
          done();
        });
    });
  });

  describe('GET /rides/:id', () => {
    it('should return row', (done) => {
      request(app)
        .get('/rides/1')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return [RIDES_NOT_FOUND_ERROR] Could not find any rides', (done) => {
      request(app)
        .get('/rides/9999')
        .end((_, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error_code').eql('RIDES_NOT_FOUND_ERROR');
          res.body.should.have.property('message').eql('Could not find any rides');
          done();
        });
    });
  });
});
