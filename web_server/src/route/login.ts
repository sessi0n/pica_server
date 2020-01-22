import {cUser} from "../data/c_user";

type json_login = {
    a : number;
    b : string;
};

module.exports = function (user : cUser, data : string) {

    const packet : json_login = JSON.parse(data);

    console.log(packet.a);
    console.log(packet.b);


};