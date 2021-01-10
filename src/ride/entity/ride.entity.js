/* eslint-disable linebreak-style */
module.exports = class RideEntity {
  data = {};

  datas = [];

  in = {
    start_lat: 'startLat',
    start_long: 'startLong',
    end_lat: 'endLat',
    end_long: 'endLong',
    rider_name: 'riderName',
    driver_name: 'driverName',
    driver_vehicle: 'driverVehicle',
  };

  out = {
    rideID: 'ride_id',
    startLat: 'start_lat',
    startLong: 'start_long',
    endLat: 'end_lat',
    endLong: 'end_long',
    riderName: 'rider_name',
    driverName: 'driver_name',
    driverVehicle: 'driver_vehicle',
  };

  constructor(type, data) {
    const keys = Object.keys(data);
    switch (type) {
      case 'in':
        keys.map((key) => {
          if (this.in[key]) {
            this.data[this.in[key]] = data[key];
          }
          return key;
        });
        break;
      default:
        if (Array.isArray(data)) {
          data.map((dat, index) => {
            const akeys = Object.keys(dat);
            this.datas[index] = {};
            akeys.map((key) => {
              if (this.out[key]) {
                this.datas[index][this.out[key]] = dat[key];
              }
              return key;
            });
            return dat;
          });
        } else {
          keys.map((key) => {
            if (this.out[key]) {
              this.data[this.out[key]] = data[key];
            }
            return key;
          });
        }
        break;
    }
  }
};
