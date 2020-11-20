const winston = require('winston');
require('winston-daily-rotate-file');
// const moment = require('moment');
// const util = require('util');
// const MESSAGE = Symbol.for('message');

class Logger {
    private static _instance: Logger;
    public static get instance(): Logger {
        return this._instance || (this._instance = new this());
    }

    logger: any;

    init(level: string, path: string, file: string): any {
        // console.log(path);
        let filename = file + '_%DATE%.log';
        let transport = new (winston.transports.DailyRotateFile)({
            dirname: path,
            filename: filename,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        });
        transport.on('rotate', function (oldFilename: string, newFilename: string) {
            // do something fun
        });

        let optCreate: any = {
            level: level,
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                // winston.format.colorize({all: true}),
                winston.format.simple(),
                winston.format.align(),
                winston.format.splat(),
                winston.format.printf((info: any) => {
                    const {timestamp, level, message, ...extra} = info;

                    return `${timestamp} [${level}]${message} ${
                        Object.keys(extra).length ? JSON.stringify(extra, null, 2) : ''
                    }`;
                }),
            ),
            transports: [
                transport,
                new winston.transports.Console({debugStdout: true, format: winston.format.colorize({all: true})})
                // .winston.format.colorize({all: true}),
                // new winston.transports.File({ dirname: this._path, filename: this._file })
            ]
        };
        this.logger = winston.createLogger(optCreate);

        return this.logger;
    }

    info(message?: any, ...optionalParams: any[]) {
        return this.logger.info(message, ...optionalParams);
    }
    debug(message?: any, ...optionalParams: any[]) {
        return this.logger.debug(message, ...optionalParams);
    }
    error(message?: any, ...optionalParams: any[]) {
        return this.logger.error(message, ...optionalParams);
    }
    warn(message?: any, ...optionalParams: any[]) {
        return this.logger.warn(message, ...optionalParams);
    }
}


export const logger = Logger.instance;
