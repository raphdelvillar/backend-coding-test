/* eslint-disable linebreak-style */
const fs = require('fs');
const Winston = require('winston');
const { format } = require('winston');
const moment = require('moment');

class Logger {
  enabled = true;

  constructor() {
    const unixTimeStamp = moment().unix();
    const stream = fs.createWriteStream(`logs/${unixTimeStamp}.log`);
    const logger = Winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new Winston.transports.File({ stream }),
        new Winston.transports.Console(),
      ],
    });

    Winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green',
    });

    this.logger = logger;
  }

  toggle(value) {
    this.enabled = value;
  }

  info(message) {
    if (this.enabled) {
      this.logger.info(message);
    }
  }

  error(message) {
    if (this.enabled) {
      this.logger.error(message);
    }
  }
}

const logger = new Logger();
module.exports = logger;
