/* eslint-disable linebreak-style */
const RideEntity = require('./entity/ride.entity');

module.exports = class RideService {
  table = 'Rides';

  constructor(db) {
    this.db = db;
    const schema = `
        CREATE TABLE IF NOT EXISTS Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

    this.db = this.db.run(schema);
  }

  async findAll(params) {
    let query = `SELECT * FROM ${this.table}`;
    const values = [];
    if (params.limit) {
      query += ' LIMIT ?';
      values.push(params.limit);
    }
    if (params.skip) {
      query += ' OFFSET ?';
      values.push(params.skip);
    }
    const result = await new Promise((resolve, reject) => {
      this.db.all(query, values, (err, rows) => {
        if (err) reject(new Error(err));
        resolve(rows);
      });
    });

    if (result) {
      const ride = new RideEntity('out', result);
      return ride.datas;
    }
    return [];
  }

  async findOne(id) {
    const query = `SELECT * FROM ${this.table} WHERE rideID = ?`;
    const values = [id];
    const result = await new Promise((resolve, reject) => {
      this.db.get(query, values, (err, row) => {
        if (err) reject(new Error(err));
        resolve(row);
      });
    });

    if (result) {
      const ride = new RideEntity('out', result);
      return ride.data;
    }
    return {};
  }

  async create(dto) {
    const ride = new RideEntity('in', dto);
    const query = `INSERT INTO ${this.table}(${[...Object.keys(ride.data)]}) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [...Object.values(ride.data)];
    const lastID = await new Promise((resolve, reject) => {
      this.db.run(query, values, function insert(err) {
        if (err) reject(new Error(err));
        resolve(this.lastID);
      });
    });

    const result = await this.findOne(lastID);
    return result;
  }
};
