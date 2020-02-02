'use strict';

import {cManagerPool} from './mng_pool';
// import * as yaml from 'yaml-config'
const yaml = require('yaml-config');
import { FailLogger } from "./constants/logger";
import { Redis } from "./constants/redis";


type conf = {
    log : { level : string, path: string, file: string};
    end_point: string;
    redis: {ip: string, port: number};
};

export class cMatchingSystem {
    _serverName!: string;
    _serverPort!: number;
    _matchType!: string;
    _pool_manager!: cManagerPool;
    _redis!: object;
    _conf!: conf;
    _env!: string;

    // public logger : FailLogger;
    public set_env(env:string):void { this._env = env; }
    
    private static _instance: cMatchingSystem;
    public static get instance(): cMatchingSystem {
        return this._instance || (this._instance = new this());
    }

    async startMatchingServer() {
        await this.read_arg()
            .then(() => this.read_env())
            .then(() => this.read_config_file())
            .then(() => this.connectRedis())
            .then(() => {
                if (this._matchType === LOAD_TYPE_NORMAL) {
                    this._pool_manager = new cManagerPool(LOAD_TYPE_NORMAL);
                } else {
                    return console.log('[initMatchingServer] ERROR: no server type');
                }

                this._pool_manager.workerPool();

            })
            .catch((err) => console.log(err));

   }

    read_arg() {
        return new Promise((resolve, reject) => {
            console.log('0: ' +process.argv[2]);
            console.log('1: ' + process.argv[3]);

            this._matchType = process.argv[2];

            return resolve();
        });
    }

    read_env() {
        return new Promise((resolve, reject) => {
            if (process.env['SERVICE_ENV'] == null) {
                return reject('setting your environment');
            }


            this.set_env(process.env['SERVICE_ENV']);
            console.log(this._env);


            return resolve();
        });
    }

    read_config_file() {
        return new Promise<void>((resolve, reject) => {
            this._conf = yaml.readConfig(FILE_PATH_CONF, this._env);

            console.log(this._conf);

            if (this._conf == null)
                return reject('invalid configure');

            if (this._conf.log == null)
                return reject('invalid log configure');

            let logger_instance = new FailLogger();
            logger = logger_instance.init(
                this._conf.log.level,
                __dirname +this._conf.log.path,
                this._conf.log.file);

            return resolve();
        })
    }

    connectRedis() {
        return new Promise<void>(async (resolve, reject) => {

            if (this._conf.redis == null)
                return reject('not set redis in conf');

            redisClient = await (new Redis()).init(this._conf.redis.ip, this._conf.redis.port);

            if (!redisClient.connected)
                return reject('cannot connect redis');
            else
                console.log('connect redis: %s, %d', this._conf.redis.ip, this._conf.redis.port);

            resolve();
        });
    }
}


