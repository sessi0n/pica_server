import net = require('net');
import { cCard } from './c_card';
import {cService} from "./mng_service";
import {cUnit} from "./c_unit";

declare const game_server : cService;

export class cUser {
    // _deck: Array<cCard>;
    // _room_key : string;
    // _my_champ_array_index : number; // room > _champ

    constructor(private _socket : net.Socket, private _uid : number) {

    }


    get_uid() {
        return this._uid;
    }
    clear_user() {

    }

    send_packet(e_index : number, send_obj : JSON) {
        game_server.send_packet(this._socket, e_index, send_obj);
    }
}