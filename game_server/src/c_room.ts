import { cUser } from './c_user';
import { cCell } from './c_cell';
import { cChamp } from './c_champ';
import { cMinion } from './c_minion';
import {cService} from "./mng_service";
// import {cTableMng} from "./mng_table";

declare const game_server : cService;
// declare const table_champ : cTableMng;


export class cRoom {
    _users : Array<cUser>;
    _cell : Array<cCell>;

    _champ : Array<cChamp>;
    _minion : Array<cMinion>;

    constructor(max_user_cnt : number, max_cell_cnt: number) {
        this._users = new Array(max_user_cnt);
        this._cell = new Array(max_cell_cnt);
        this._champ = new Array(2);
        this._minion = [];
    }

    clear_room() {
        let users = Array<number>();
        for (const user of this._users) {
            users.push(user.get_uid());
            user.clear_user();
        }
        return users;
    }

    battle_champ_vs_champ() {
        // let champ_stat = table_champ.get_attr('champ_stat', 1);

    }
}