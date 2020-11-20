
/*
    let rcode = eRCODE.DB_INSERT_NEW_ACCOUNT1;

    if (RCODE_SUCCEEDED(rcode))
      throw new SakuraError(eRCODE.DB_INSERT_NEW_ACCOUNT1);
    if (RCODE_FAILED(rcode))
      throw new SakuraError(eRCODE.DB_INSERT_NEW_ACCOUNT1);

 */

import {SError} from "../../proto/src/packet_pb";
import {ePLAIN_CODE} from "./custom_error_types";

export class CustomError extends Error {
  _obj: any;
  _err: string;
  _rcode: number;
  _is_inc_error_count: boolean = false;

  constructor(errorNum: number) {
    super(errorNum.toString());
    let sendObj: any = new SError();
    this._rcode = errorNum;
    errorNum = errorNum & 0x00FF;

    let rPlainStr = Convert.getEnumKey(ePLAIN_CODE, this._rcode & 0x0F000000);
    sendObj.setId(errorNum);
    sendObj.setErr(`${rPlainStr}|${Convert.getEnumKey(eRCODE, this._rcode)}|${Convert.getEnumKey(RESULT, errorNum)}`);
    this._obj = sendObj;
    this._is_inc_error_count = (errorNum == RESULT.UNKNOWN_ERROR);
  }

  printRcodeError(controller: string) {
    let route_code = routeNames.get(controller) as any;

    if (route_code) {
      if (this._rcode < 0) {
        let rCodeStr = Convert.getEnumKey(eRCODE, this._rcode);
        let plainCode = this._rcode & 0x0F000000;
        let rPlainStr = Convert.getEnumKey(ePLAIN_CODE, plainCode);
        let result = this._rcode & 0x00FF;
        let resultStr = Convert.getEnumKey(RESULT, result);
        let legacyCode = this._rcode & 0xF0000000;
        let legacyCodeStr = Convert.getEnumKey(eLEGACY_CODE, legacyCode); //안됨
        let rCode = route_code.e | this._rcode;
        rCode = 0xFFFFFFFF + rCode + 1;
        logger.error('eRCODE|%s|%s|%s|%s|%s', 'failed', rCode.toString(16).toUpperCase(), rPlainStr, rCodeStr, resultStr);
      }
      else {
      }
    }
    else {
    }
  }

  get sendObj() {
    return this._obj;
  }

  get is_inc_error_count() {
    return this._is_inc_error_count;
  }
}


