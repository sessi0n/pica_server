import {cUser} from "../c_user";


type json_load_battle = {
    a : number;
    b : string;
};

module.exports = function (user : cUser, data : string) {

    const packet : json_load_battle = JSON.parse(data);

    console.log(packet.a);
    console.log(packet.b);


};