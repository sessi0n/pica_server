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

    private static _instance: App;
    public static get instance(): App {
        return this._instance || (this._instance = new this());
    }

    // public static bootstrap (): App {
    //     return new App();
    // }

    constructor () {
        this.app = express();
        this._proto = new cPacketMng();
        this._routes = require('./mng_route_files');
        this.app.use([this.pre_route, this.mid_route, this.fin_route]);
    }

    pre_route(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('pre_route');
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
        console.log('mid_route');
        let fn : any = this._routes[req.tenant ? req.tenant.e_index : 0];
        if (fn)
            fn.call(this, null, req.tenant ? req.tenant.json_pack : null)
                .then(() => next())
                .catch((err: Error) => {

                });

    }
    fin_route(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('fin_route');
        res.send('Hello world');
    }
}

export default App;