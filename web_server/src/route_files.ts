import {eERR_ROUTE_CODE} from "./constants/custom_error_types";

export const route_files = new Map<string, object>();

route_files.set('none', {f: 'none', e: eERR_ROUTE_CODE.ROUTE_NONE});
route_files.set('CRegister', {f: 'sys/register', e: eERR_ROUTE_CODE.ROUTE_REGISTER});
route_files.set('CLogin', {f: 'sys/login', e: eERR_ROUTE_CODE.ROUTE_LOGIN});


route_files.forEach((value: any, key, obj) => {
    exports[key] = require('./route/' + value.f);
});