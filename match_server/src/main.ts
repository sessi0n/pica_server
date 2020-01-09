'use strict';
require('module-alias/register');
import {cMatchingSystem} from "src/mng_service";


let server = cMatchingSystem.instance;


if (process.env['SERVICE_ENV'] == null) {
    console.log('setting your environment');
    process.exit();
}


server.set_env(process.env['SERVICE_ENV']);

server.startMatchingServer()
    .catch((err) => console.log(err));
