'use strict';

import {cManagerPool} from './mng_pool';

export class cMatchingSystem {
    _serverName: string;
    _serverPort: number;
    _matchType: string;
    _pool_manager: cManagerPool;
    private static _instance: cMatchingSystem;
    public static get instance(): cMatchingSystem {
        return this._instance || (this._instance = new this());
    }

    async startMatchingServer() {
        await this.connectDatabase()
            .catch((err) => console.log(err));

        if (this._matchType === LOAD_TYPE_NORMAL) {
            this._pool_manager = new cManagerPool(LOAD_TYPE_NORMAL);
        } else {
            return console.log('[initMatchingServer] ERROR: no server type');
        }

        this._pool_manager.startPool();
    }

    connectDatabase() {
        return new Promise(async (resolve, reject) => {

            resolve();
        });
    }


}
