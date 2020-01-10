import {LoggerOptions} from "winston";

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment');
const util = require('util');
const MESSAGE = Symbol.for('message');

export class FailLogger {
    // private static _instance: FailLogger;
    // public static get instance(): FailLogger {
    //     return this._instance || (this._instance = new this());
    // }

    init(level:string, path:string, file:string) : any {

        let opt_create : any = {
            level: level,
            format: winston.format.combine(
                winston.format(function(info, opts) {
                    let prefix = util.format('[%s] [%s]', moment().format('YYYY-MM-DD hh:mm:ss').trim(), info.level.toUpperCase());
                    if (info.splat) {
                        info.message = util.format('%s %s', prefix, util.format(info.message, ...info.splat));
                    }
                    else {
                        info.message = util.format('%s %s', prefix, info.message);
                    }
                    return info;
                })(),
                winston.format(function(info) {
                    info[MESSAGE] = info.message + ' ' + JSON.stringify(
                        Object.assign({}, info, {
                            level: undefined,
                            message: undefined,
                            splat: undefined
                        })
                    );
                    return info;
                })()
            ),
            transports: [
                new winston.transports.Console({debugStdout: true})
                // new winston.transports.File({ dirname: this._path, filename: this._file })
            ]
        };
        let log = winston.createLogger(opt_create);
        let opt_configure : any = {
            level: level,
            transports: [
                new DailyRotateFile({
                    name: 'file2',
                    level: 'debug',
                    dirname: path,
                    filename: file,
                    datePattern: 'YYYY-MM-DD',
                    json: false,
                    maxsize: 10485760, //5MB
                    maxFiles: 20
                })
            ]
        };
        log.configure(opt_configure);

        log.debug('logger start');
        log.debug('logger start');

        return log;
    }
}
