import {cUser} from "../c_user";

type json_end_game = {
    a : number;
    b : string;
};



module.exports = function (user : cUser, data : string) {

    const packet : json_end_game = JSON.parse(data);



    console.log(packet.a);
    console.log(packet.b);


};