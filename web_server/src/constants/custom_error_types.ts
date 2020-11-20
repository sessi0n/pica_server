/*===============================================================================================================
// Return Code Coding Rule
//===============================================================================================================
 +---------------------+---------------------+
 | 1___ ____ ____ ____ | ____ ____ ____ ____ |     : Success/Failed Flag
 | 0XXX XXXX XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - Success
 | 1XXX XXXX XXXX XXXX | XXXX XXXX XXXX XXXX |     :    - Failed
 +---------------------+---------------------+
 | XXXX XXXX XXXX XXXX | XXXX XXXX 1111 1111 |     :    - RESULT enum > proto-buf
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
import {RESULT} from "../../proto/src/packet/packet_pb";

export enum eLEGACY_CODE {
  success = 0x00000000,
  failed = 0x80000000,
}

export enum ePLAIN_CODE {
  MANAGER = 0x01000000,
  ROUTE = 0x02000000,
  DB = 0x03000000,
}

export enum eERR_ROUTE_CODE {
  ROUTE_NONE = 0x00000000,
  ROUTE_REGISTER = 0x00010000,
  ROUTE_LOGIN = 0x00020000,
  ROUTE_USER_INFO = 0x00030000,

  ROUTE_EQUIPMENT_LOCK = 0x00040000,
}

export enum eERR_MANAGER_CODE {
  MNG_BATTLE = 0x001C0000,
}

let ERR_CODE_MANGER = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.MANAGER);
let SUCCESS_CODE_MNG = (0x00 | eLEGACY_CODE.success | ePLAIN_CODE.MANAGER);

let SUCCESS_CODE_MNG_BATTLE = (SUCCESS_CODE_MNG | eERR_MANAGER_CODE.MNG_BATTLE);

export enum eRCODE {
  ERR_SESSION_ERROR = (ERR_CODE_MANGER | 0x0100 | RESULT.SESSION_ERROR),
  ERR_UNKNOWN_ERROR = (ERR_CODE_MANGER | 0x0200 | RESULT.UNKNOWN_ERROR),
  ERR_SAVE_ALL_ERROR = (ERR_CODE_MANGER | 0x0300 | RESULT.UNKNOWN_ERROR),
  ERR_SESSION_ERROR2 = (ERR_CODE_MANGER | 0x0400 | RESULT.SESSION_ERROR),
  ERR_SESSION_ERROR3 = (ERR_CODE_MANGER | 0x0500 | RESULT.SESSION_ERROR),

  ERR_MNG_BATTLE_NOT_ENOUGH_COST = (SUCCESS_CODE_MNG_BATTLE | 0x0100 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_NOT_ENOUGH_EXTRA_COST = (SUCCESS_CODE_MNG_BATTLE | 0x0200 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_TRANS_TYPE = (SUCCESS_CODE_MNG_BATTLE | 0x0300 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_EMPTY_CHARACTER = (SUCCESS_CODE_MNG_BATTLE | 0x0400 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_INVALID_CHARACTER_DATA = (SUCCESS_CODE_MNG_BATTLE | 0x0500 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_INVALID_PROB_DATA = (SUCCESS_CODE_MNG_BATTLE | 0x0600 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_NOT_DEV_INPUT_TYPE = (SUCCESS_CODE_MNG_BATTLE | 0x0700 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_INVALID_REQ_MUST = (SUCCESS_CODE_MNG_BATTLE | 0x0800 | RESULT.PARAMETER_ERROR),
  ERR_MNG_BATTLE_INVALID_CARRIER_DATA = (SUCCESS_CODE_MNG_BATTLE | 0x0900 | RESULT.PARAMETER_ERROR),

}

let ERR_CODE_ROUTE = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.ROUTE);
let SUCCESS_CODE_ROUTE = (0x00 | eLEGACY_CODE.success | ePLAIN_CODE.ROUTE);
let SUCCESS_CODE_ROUTE_REGISTER = (SUCCESS_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_REGISTER);
let SUCCESS_CODE_ROUTE_LOGIN = (SUCCESS_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_LOGIN);
let SUCCESS_CODE_ROUTE_USER_INFO = (SUCCESS_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_USER_INFO);
let SUCCESS_CODE_ROUTE_EQUIPMENT_LOCK = (SUCCESS_CODE_ROUTE | eERR_ROUTE_CODE.ROUTE_EQUIPMENT_LOCK);


//라우터
export enum eRCODE {
  ERR_ROUTE_COMBAT_INVASION_END_INVALID_KEY = (SUCCESS_CODE_ROUTE_COMBAT_INVASION_END | 0x0100 | RESULT.PARAMETER_ERROR),
  ERR_ROUTE_COMBAT_INVASION_END_INVALID_AREA_ID = (SUCCESS_CODE_ROUTE_COMBAT_INVASION_END | 0x0200 | RESULT.PARAMETER_ERROR),
  ERR_ROUTE_COMBAT_INVASION_END_INVALID_STATE = (SUCCESS_CODE_ROUTE_COMBAT_INVASION_END | 0x0300 | RESULT.PARAMETER_ERROR),
  ERR_ROUTE_COMBAT_INVASION_END_INVALID_REQ = (SUCCESS_CODE_ROUTE_COMBAT_INVASION_END | 0x0400 | RESULT.PARAMETER_ERROR),

  ERR_ROUTE_SET_BLUE_PRINT_NOT_MATCH_BLUE_PRINT = (SUCCESS_CODE_ROUTE_SET_BLUE_PRINT | 0x0100 | RESULT.PARAMETER_ERROR),
  ERR_ROUTE_SET_BLUE_PRINT_ALREADY_HAVE_BLUE_PRINT = (SUCCESS_CODE_ROUTE_SET_BLUE_PRINT | 0x0200 | RESULT.PARAMETER_ERROR),
  ERR_ROUTE_SET_BLUE_PRINT_NOT_MATCH_LEVEL = (SUCCESS_CODE_ROUTE_SET_BLUE_PRINT | 0x0300 | RESULT.PARAMETER_ERROR),
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
let ERR_DB_CODE_CUSTOM_RESULT = (0x00 | eLEGACY_CODE.failed | ePLAIN_CODE.DB);
let ERR_DB_CODE_SKILL = (ERR_DB_CODE | eERR_DB_CODE.DB_SKILL);
let ERR_DB_CODE_USER = (ERR_DB_CODE | eERR_DB_CODE.DB_USER);
let ERR_DB_CODE_CHARACTER = (ERR_DB_CODE | eERR_DB_CODE.DB_CHARACTER);
let ERR_DB_CODE_ETC_ITEM = (ERR_DB_CODE | eERR_DB_CODE.DB_ETC_ITEM);
let ERR_DB_CODE_EQUIPMENT = (ERR_DB_CODE | eERR_DB_CODE.DB_EQUIPMENT);
let ERR_DB_CODE_CURRENCY = (ERR_DB_CODE | eERR_DB_CODE.DB_CURRENCY);
let ERR_DB_CONSTELLATION_STAGE = (ERR_DB_CODE | eERR_DB_CODE.DB_CONSTELLATION_STAGE);

export enum eRCODE {
  DB_RESISTER = (ERR_DB_CODE_USER | 0x0100 | RESULT.DB_ERROR),
  DB_SAVE_USER = (ERR_DB_CODE_USER | 0x0200 | RESULT.DB_ERROR),

  DB_INSERT_SKILL = (ERR_DB_CODE_SKILL | 0x0100 | RESULT.DB_DATA_EMPTY),
  DB_SAVE_SKILL = (ERR_DB_CODE_SKILL | 0x0200) | RESULT.DB_ERROR,

  DB_SAVE_CHARACTER = (ERR_DB_CODE_CHARACTER | 0x0100 | RESULT.DB_ERROR),
  DB_SAVE_ETC_ITEM = (ERR_DB_CODE_ETC_ITEM | 0x0100 | RESULT.DB_ERROR),
  DB_INSERT_ALL_EQUIP = (ERR_DB_CODE_EQUIPMENT | 0x0100 | RESULT.DB_ERROR),

  DB_SELECT_CURRENCY = (ERR_DB_CODE_CURRENCY | 0x0100 | RESULT.DB_ERROR),
  DB_SAVE_SUB_RUBIES = (ERR_DB_CODE_CURRENCY | 0x0200 | RESULT.DB_ERROR),

  DB_SELECT_CONSTELLATION_STAGE = (ERR_DB_CONSTELLATION_STAGE | 0x0100 | RESULT.DB_DATA_EMPTY),
}

export function RCODE_SUCCEEDED(code: eRCODE) {
  return (code | 0x00) >= 0;
}

export function RCODE_FAILED(code: eRCODE) {
  return (code | 0x00) < 0;
}

export function RCODE_DB_FAILED(rows: any) {
  if (!rows[0])
    return true;
  if (!rows[0].RCODE)
    return true;

  return (rows[0].RCODE | 0x00) < 0;
}