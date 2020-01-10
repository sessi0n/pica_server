import {cMatch} from "./c_match";

export class cFriendMatch extends cMatch{
    constructor() {
        super();
        console.log('created cFriendMatch');
    }

    matchUsers() {
        return new Promise((resolve, reject) => {
            let start = +new Date();


            let end = +new Date();

            return resolve(end-start);
        });
    }

}