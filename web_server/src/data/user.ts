

export class User {
    // public readonly userKey : string;
    public nickName : string;
    public level : number;

    constructor(map : Map<string, any>) {
        // this.userKey = userKey;
        this.nickName = map.get('nick_name');
        this.level = map.get('level');


    }


}