import {logger} from "./constants/logger";

export class Middleware {
  private readonly _routes: any;

  constructor() {
    this._routes = require('./route_files');
  }

  async pre_route(req: any, res: any) {
    console.log('pre_route');
    let data: Buffer[];
    let self = this;

  }

  async mid_route(req: any, res: any) {
    console.log('mid_route');
    let fn: Function = this._routes.get(`C${req._data.controller}`);
    if (fn) {
      fn.call(this, null, req.tenant ? req.tenant.json_pack : null)
      .catch((err: Error) => {
        logger.error(err);
      });
    }

  }

  async fin_route(req: any, res: any) {
    console.log('fin_route');
    res.send('Hello world');
  }
}