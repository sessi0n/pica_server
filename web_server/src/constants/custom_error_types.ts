/*===============================================================================================================
// Return Code Coding Rule
//===============================================================================================================
 +---------------------+---------------------+
 | 1___ ____ ____ ____ | ____ ____ ____ ____ |     : Success/Failed Flag
 | 0XXX XXXX XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - Success
 | 1XXX XXXX XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - Failed
 +---------------------+---------------------+
 | XXXX XXXX XXXX XXXX | XXXX XXXX 1111 1111 |     :    - eERROR enum > proto-buf
 +---------------------+---------------------+
 | XXXX XXXX XXXX XXXX | 1111 1111 XXXX XXXX |     :    - 선언된 에러 형태로 2자리수 사용
 +---------------------+---------------------+
 | XXXX XXXX 1111 1111 | XXXX XXXX XXXX XXXX |     :    - router error each
 +---------------------+---------------------+
 | XXXX XXX1 XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - router error define
 +---------------------+---------------------+
 | XXXX XX1X XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - manager error define
 +---------------------+---------------------+
 | XXXX XX11 XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - db error define
 +---------------------+---------------------+
===============================================================================================================*/

import { eERROR } from "../../proto/src/enum/error_pb";


export enum eLEGACY_CODE {
  success = 0x00000000,
  failed = 0x80000000,
}

export enum ePLAIN_CODE {
  MANAGER = 0x01000000,
  ROUTE = 0x02000000,
  DB = 0x03000000,
}

export enum eERR_MANAGER_CODE {
  MNG_NONE = 0x00000000,
  
  MNG_SYS = 0x00010000,
  MNG_USER = 0x00020000,
}

export enum eERR_ROUTE_CODE {
  ROUTE_NONE = 0x00000000,

  ROUTE_REGISTER = 0x00010000,
  ROUTE_LOGIN = 0x00020000,
}

let ERR_CODE_MANGER = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.MANAGER);
let SUCCESS_CODE_MNG = (0x00 | eLEGACY_CODE.success | ePLAIN_CODE.MANAGER);

let ERR_MNG_SYS = (ERR_CODE_MANGER | eERR_MANAGER_CODE.MNG_SYS);
let ERR_MNG_USER = (ERR_CODE_MANGER | eERR_MANAGER_CODE.MNG_USER);

export enum eRCODE { //define manager error
  ERR_MNG_SYS_SESSION = (ERR_MNG_SYS | 0x0100 | eERROR.SESSION),
  ERR_MNG_SYS_UNKNOWN = (ERR_MNG_SYS | 0x0200 | eERROR.UNKNOWN),
  ERR_MNG_SYS_SAVE_ALL = (ERR_MNG_SYS | 0x0300 | eERROR.UNKNOWN),

  ERR_MNG_USER_NOT_ENOUGH_COST = (ERR_MNG_USER | 0x0100 | eERROR.PARAMETER),
}

let ERR_CODE_ROUTE = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.ROUTE);
let SUCCESS_CODE_ROUTE = (0x00 | eLEGACY_CODE.success | ePLAIN_CODE.ROUTE);

let ERR_ROUTE_REGISTER = (ERR_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_REGISTER);
let ERR_ROUTE_LOGIN = (ERR_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_LOGIN);


//라우터
export enum eRCODE {
  ERR_ROUTE_REGISTER_INVALID_KEY = (ERR_ROUTE_REGISTER | 0x0100 | eERROR.PARAMETER),
  ERR_ROUTE_REGISTER_INVALID_AREA_ID = (ERR_ROUTE_REGISTER | 0x0200 | eERROR.PARAMETER),
  ERR_ROUTE_REGISTER_INVALID_STATE = (ERR_ROUTE_REGISTER | 0x0300 | eERROR.PARAMETER),
  ERR_ROUTE_REGISTER_INVALID_REQ = (ERR_ROUTE_REGISTER | 0x0400 | eERROR.PARAMETER),

  ERR_ROUTE_LOGIN_NOT_MATCH_BLUE_PRINT = (ERR_ROUTE_LOGIN | 0x0100 | eERROR.PARAMETER),
  ERR_ROUTE_LOGIN_ALREADY_HAVE_BLUE_PRINT = (ERR_ROUTE_LOGIN | 0x0200 | eERROR.PARAMETER),
  ERR_ROUTE_LOGIN_NOT_MATCH_LEVEL = (ERR_ROUTE_LOGIN | 0x0300 | eERROR.PARAMETER),
}

export enum eERR_DB_CODE {
  DB_SKILL = 0x00000000,
  DB_USER = 0x00010000,
  DB_CHARACTER = 0x00020000,
  DB_ETC_ITEM = 0x00030000,
  DB_EQUIPMENT = 0x00040000,
  DB_CURRENCY = 0x00050000,
  DB_CONSTELLATION_STAGE = 0x00060000,
}

let ERR_DB_CODE = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.DB);
let ERR_DB_CODE_CUSTOM_eERROR = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.DB);
let ERR_DB_CODE_SKILL = (ERR_DB_CODE | eERR_DB_CODE.DB_SKILL);
let ERR_DB_CODE_USER = (ERR_DB_CODE | eERR_DB_CODE.DB_USER);
let ERR_DB_CODE_CHARACTER = (ERR_DB_CODE | eERR_DB_CODE.DB_CHARACTER);
let ERR_DB_CODE_ETC_ITEM = (ERR_DB_CODE | eERR_DB_CODE.DB_ETC_ITEM);
let ERR_DB_CODE_EQUIPMENT = (ERR_DB_CODE | eERR_DB_CODE.DB_EQUIPMENT);
let ERR_DB_CODE_CURRENCY = (ERR_DB_CODE | eERR_DB_CODE.DB_CURRENCY);
let ERR_DB_CONSTELLATION_STAGE = (ERR_DB_CODE | eERR_DB_CODE.DB_CONSTELLATION_STAGE);

// export enum eRCODE {
//   DB_RESISTER = (ERR_DB_CODE_USER | 0x0100 | eERROR.DB),
//   DB_SAVE_USER = (ERR_DB_CODE_USER | 0x0200 | eERROR.DB),
//
//   DB_INSERT_SKILL = (ERR_DB_CODE_SKILL | 0x0100 | eERROR.DB),
//   DB_SAVE_SKILL = (ERR_DB_CODE_SKILL | 0x0200) | eERROR.DB,
//
//   DB_SAVE_CHARACTER = (ERR_DB_CODE_CHARACTER | 0x0100 | eERROR.DB),
//   DB_SAVE_ETC_ITEM = (ERR_DB_CODE_ETC_ITEM | 0x0100 | eERROR.DB),
//   DB_INSERT_ALL_EQUIP = (ERR_DB_CODE_EQUIPMENT | 0x0100 | eERROR.DB),
//
//   DB_SELECT_CURRENCY = (ERR_DB_CODE_CURRENCY | 0x0100 | eERROR.DB),
//   DB_SAVE_SUB_RUBIES = (ERR_DB_CODE_CURRENCY | 0x0200 | eERROR.DB),
//
//   DB_SELECT_CONSTELLATION_STAGE = (ERR_DB_CONSTELLATION_STAGE | 0x0100 | eERROR.DB),
// }
//
// export function RCODE_SUCCEEDED(code: eRCODE) {
//   return (code | 0x00) >= 0;
// }
//
// export function RCODE_FAILED(code: eRCODE) {
//   return (code | 0x00) < 0;
// }
//
// export function RCODE_DB_FAILED(rows: any) {
//   if (!rows[0])
//     return true;
//   if (!rows[0].RCODE)
//     return true;
//
//   return (rows[0].RCODE | 0x00) < 0;
// }