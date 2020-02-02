import {User} from "../data/user";

export class cUser extends User {
    public sessionKey : string;

    constructor(map : Map<string, any>, sessionKey : string) {
        super(map);
        this.sessionKey = sessionKey;
    }


    load_user_data() {


    }

    create_user_data() {

    }
}