'use strict';

const fs = require('fs');
const Winston = require('winston');
const { format } = require('winston');

module.exports = () => {
    const stream = fs.createWriteStream(`logs/${Math.floor(new Date() / 1000)}.log`);
    let logger = Winston.createLogger({
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
            new Winston.transports.File({ stream: stream }),
            new Winston.transports.Console()
        ]
    })

    Winston.addColors({
        error: 'red',
        warn: 'yellow',
        info: 'cyan',
        debug: 'green'
    });

    return logger;
}