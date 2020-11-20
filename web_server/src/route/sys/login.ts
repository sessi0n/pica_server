import {User} from "../../user";
import { CLogin } from "../../../proto/src/packet_pb";
import { SLogin } from "../../../proto/src/packet_pb";

module.exports = async function (packet: Uint8Array, user: User) {
    let req: CLogin = CLogin.deserializeBinary(packet);

    let res: SLogin = new SLogin();


    return res;
};