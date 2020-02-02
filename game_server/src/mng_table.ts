
import * as Type from './constants/define_type';

class cTableMng<T> {
    // private static _instance : any;
    // public static get instance(): any {
    //     return this._instance || (this._instance = new this());
    // }

    public data = new Map<number, T>();

    constructor() {
    }

    set_data(tid: number, data : T) : void {
        this.data.set(tid, data);
    }

    get_data(tid: number) : T | undefined {
        return this.data.get(tid);
    }

}

let champ = new cTableMng<Type.db_champ_stat>();
let minion = new cTableMng<Type.db_minion_stat>();


console.log('------- check load table data --------');
exports.champ = champ;
exports.minion = minion;
