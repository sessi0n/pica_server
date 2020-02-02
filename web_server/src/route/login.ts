import {cUser} from "../class/c_user";
import {User} from "../data/user";

type json_login = {
    a : number;
    b : string;
};

module.exports = async function (user : cUser, data : string) {

    const packet : json_login = JSON.parse(data);

    let temp_data = _objToStrMap({
        nickName: 'nick',
        level: 5,
    });
    let temp : cUser = new cUser(temp_data, 'aa-bb');

    console.log(packet.a);
    console.log(packet.b);


};