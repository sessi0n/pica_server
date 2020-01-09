'use strict';

import {cManagerPool} from './mng_pool';
import * as redis from 'redis'
import * as yaml from 'yaml'
import * as fs from 'fs'
import {ServerSetting} from "./constants/server_setting";

require('./constants/server_setting');

export class cMatchingSystem {
    _serverName: string;
    _serverPort: number;
    _matchType: string;
    _pool_manager: cManagerPool;
    _redis: object;
    _conf: object;
    _env: string;

    public set_env(env:string):void { this._env = env; }
    
    private static _instance: cMatchingSystem;
    public static get instance(): cMatchingSystem {
        return this._instance || (this._instance = new this());
    }

    async startMatchingServer() {
        this.read_arg_and_env()
        this.read_config_file()
            .then(() => this.connectRedis())
            .then(() => {
                if (this._matchType === ServerSetting.LOAD_TYPE_NORMAL) {
                    this._pool_manager = new cManagerPool(ServerSetting.LOAD_TYPE_NORMAL);
                } else {
                    return console.log('[initMatchingServer] ERROR: no server type');
                }

                this._pool_manager.startPool();

            })
            .catch((err) => console.log(err));

   }

    connectRedis() {
        return new Promise<void>(async (resolve, reject) => {



            // let client = redis.createClient('', '', '');


            resolve();
        });
    }

    read_arg_and_env() {
        console.log('0: ' +process.argv[2]);
        console.log('1: ' + process.argv[3]);
    }

    read_config_file() {
        return new Promise<void>((resolve, reject) => {
            console.log(ServerSetting.FILE_PATH_CONF);
            const file = fs.readFileSync(ServerSetting.FILE_PATH_CONF, 'utf8');
            this._conf = (yaml.parse(file))[this._env];


            if (this._conf == null)
                return reject();



            return resolve();
        })
    }

}
