'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const routes = require('../src/routes')(db);
const app = require('../src/app')(routes);
const buildSchemas = require('../src/schemas');

const Winston = require('../src/logger');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }
            buildSchemas(db);
            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return rows', (done) => {
            request(app)
                .post('/rides')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return rows', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return rows', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, done);
        });
    })
});