'use strict';
require('module-alias/register');
require('src/constants/globlas');

import { cService } from 'src/mng_service';

let game_server = cService.instance;

game_server.start_service();


