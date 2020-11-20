import {User} from "../../user";
import { CRegister } from "../../../proto/src/packet_pb";
import { SRegister } from "../../../proto/src/packet_pb";

module.exports = async function (packet: Uint8Array, user: User) {
  let req: CRegister = CRegister.deserializeBinary(packet);

  let res: SRegister = new SRegister();


  return res;

};