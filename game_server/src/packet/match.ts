import {cUser} from "../c_user";

type json_match = {
    a : number;
    b : string;
};

module.exports = function (client : cUser, data : string) {
    return new Promise((resolve, reject) => {
        let packet = JSON.parse(data);

        console.log(packet.a);
        console.log(packet.b);

        resolve();
    });
};