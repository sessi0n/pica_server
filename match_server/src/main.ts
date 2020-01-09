'use strict';
import {FailLogger} from "./constants/logger";

require('module-alias/register');
require('./constants/variable_setting');
import {cMatchingSystem} from "src/mng_service";

let server = cMatchingSystem.instance;

server.startMatchingServer()
    .then(() => {
        logger.debug('12312312312');
    })
    .catch((err) => console.log(err));
