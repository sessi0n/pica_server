import {cNormalMatch} from './c_normal_match';
import {cFriendMatch} from './c_friend_match';
import {cMatch} from "./c_match";
import {ServerSetting} from "./constants/server_setting";

export class cManagerPool {
    _matchInstance : cMatch;

    constructor(_type : string) {
        if (_type === ServerSetting.LOAD_TYPE_NORMAL)
            this._matchInstance = new cNormalMatch();
        else if (_type === ServerSetting.LOAD_TYPE_NORMAL)
            this._matchInstance = new cFriendMatch();
        else
            new Error('not set type');
    }


    startPool() {
        this._matchInstance.workerPool();
    }
}