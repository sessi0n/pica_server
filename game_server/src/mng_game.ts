
import { cUser } from './c_user';
import { cRoom } from "./c_room";

export class cGameMng {
    private _user_data : Map<number, cUser>;
    private _room_data : Map<string, cRoom>;

    constructor() {
        this._user_data = new Map<number, cUser>();
        this._room_data = new Map<string, cRoom>();
    }

    private add_user(uid: number, user: cUser) {
        this._user_data.set(uid, user);
    }
    private del_user(uid: number) {
        this._user_data.delete(uid);
    }

    private  add_room(rkey: string, room: cRoom) {
        this._room_data.set(rkey, room);
    }
    private del_room(rkey: string) {
        this._room_data.delete(rkey);
    }

    public clear_room(rkey) {
        let room = this._room_data.get(rkey);
        let users = room.clear_room();

        this.del_room(rkey);
        for (const uid of users) {
            this.del_user(uid);
        }
    }

    public get_room(rkey) {
        return this._room_data.get(rkey);
    }

    public get_user(uid) {
        return this._user_data.get(uid);
    }
}