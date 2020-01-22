import express from "express";
import {cPacketMng, proto_style} from "./mng_packet";

declare global {
    namespace Express {
        export interface Request {
            tenant?: proto_style
        }
    }
}

class App {
    public app: express.Application;
    private readonly _routes : any;
    private _proto : cPacketMng;

    public static bootstrap (): App {
        return new App();
    }

    constructor () {
        this.app = express();
        this._proto = new cPacketMng();
        this._routes = require('mng_route_files');
        this.app.use([this.pre_route, this.mid_route, this.fin_route]);
    }

    pre_route(req: express.Request, res: express.Response, next: express.NextFunction) {
        let data : Buffer[];
        let self = this;

        res.on('data', function(chunk : Buffer) {
            data.push(chunk);
        });
        res.on('end', function() {
            let buf : Buffer = Buffer.concat(data);
            let message : proto_style = self._proto.get_proto_message(buf);
            if (message) {
                req.tenant = message;
                next();
            }
        });
    }
    mid_route(req: express.Request, res: express.Response, next: express.NextFunction) {
        let fn : any = this._routes[req.tenant ? req.tenant.e_index : 0];
        fn.call(this, null, req.tenant ? req.tenant.json_pack : null);
        next();
    }
    fin_route(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.send('Hello world');
    }
}

export default App;