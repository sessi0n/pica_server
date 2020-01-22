"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mng_packet_1 = require("./mng_packet");
class App {
    constructor() {
        this.app = express_1.default();
        this._proto = new mng_packet_1.cPacketMng();
        this._routes = require('mng_route_files');
        this.app.use([this.pre_route, this.mid_route, this.fin_route]);
    }
    static bootstrap() {
        return new App();
    }
    pre_route(req, res, next) {
        let data;
        let self = this;
        res.on('data', function (chunk) {
            data.push(chunk);
        });
        res.on('end', function () {
            let buf = Buffer.concat(data);
            let message = self._proto.get_proto_message(buf);
            if (message) {
                req.tenant = message;
                next();
            }
        });
    }
    mid_route(req, res, next) {
        let fn = this._routes[req.tenant ? req.tenant.e_index : 0];
        fn.call(this, null, req.tenant ? req.tenant.json_pack : null);
        next();
    }
    fin_route(req, res, next) {
        res.send('Hello world');
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map