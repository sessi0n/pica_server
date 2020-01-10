import {cMatch} from "./c_match";


export class cNormalMatch extends cMatch{
    constructor() {
        super();
        console.log('created cNormalMatch');
    }

    matchUsers(){
        return new Promise(async (resolve, reject) => {
            let start = +new Date();

            await sleep(1000);

            let end = +new Date();

            return resolve((end-start));
        });
     }



}