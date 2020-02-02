import {cNormalMatch} from './c_normal_match';
import {cFriendMatch} from './c_friend_match';
import {cMatch} from "./c_match";

export class cManagerPool {
    _matchInstance !: cMatch;

    constructor(_type : string) {
        if (_type === LOAD_TYPE_NORMAL)
            this._matchInstance = new cNormalMatch();
        else if (_type === LOAD_TYPE_FRIEND)
            this._matchInstance = new cFriendMatch();
        else
            new Error('not set type');
    }


    async workerPool() {
        while(true) {
            let delay = 1000; //ms
            await this._matchInstance.matchUsers()
                .then((workTime:number) => this.delayWorker(delay, workTime))
                .catch((err:Error) => {
                    console.log(err);
                })
        }
    }

    delayWorker(delay:number, workTime:number) {
        return new Promise(async (resolve, reject) => {
            console.log('time spend: ' + workTime);

            if(workTime > 0 && delay - workTime > 0)
                await sleep(delay - workTime);

            resolve();
        });
    }

}