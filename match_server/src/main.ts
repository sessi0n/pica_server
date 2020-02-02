'use strict';
require('module-alias/register');
require('./constants/globals');
import {cMatchingSystem} from "src/mng_service";

let server = cMatchingSystem.instance;

server.startMatchingServer()
    .then(() => {
        logger.debug('test log');
    })
    .catch((err) => console.log(err));
