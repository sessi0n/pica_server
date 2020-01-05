import {cMatchingSystem} from '../mng_service';

let server = cMatchingSystem.instance;

server.startMatchingServer()
    .catch((err) => console.log(err));