import path from "path";
import {Middleware} from "./middleware";
import {logger} from "./constants/logger";

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

export class App {
  private _conf: any;
  private readonly _middleware: Middleware;

  constructor() {
    this._middleware = new Middleware();
  }

  async init() {
    await this.read_env();
    await this.read_conf();
    await logger.init(
        this._conf.log.level,
        path.join(__dirname, this._conf.log.path),
        this._conf.log.file);
    await this.conn_redis();
    await this.conn_db();
    await this.init_table();
  }

  read_env() {
    return new Promise((resolve, reject) => {
      if (process.env['SERVICE_ENV'] == null) {
        return reject('setting your environment');
      }
      return resolve();
    });
  }

  read_conf() {
    return new Promise<void>((resolve, reject) => {
      let server = `conf_${process.env.SERVICE_ENV}.yaml`;
      this._conf = require('yaml-config').readConfig(path.resolve(__dirname, `../conf/${server}`), process.argv[2]);

      if (this._conf == null)
        return reject('invalid configure');
      return resolve();
    })
  }

  conn_redis() {
    return new Promise((resolve, reject) => {
      return resolve();
    })
  }

  conn_db() {
    return new Promise((resolve, reject) => {
      return resolve();
    })
  }

  init_table() {
    return new Promise((resolve, reject) => {
      return resolve();
    })
  }

  async start_worker(port: number) {
    if (cluster.isMaster) {
      logger.info(`Master ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker: any, code: any, signal: any) => {
        logger.info(`worker ${worker.process.pid} died`);
      });
    }
    else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server
      http.createServer((req: any, res: any) => {
        this._middleware.pre_route(req, res)
        .then(() => this._middleware.mid_route(req, res))
        .then(() => this._middleware.fin_route(req, res))
        .catch((err) => {
          logger.error(err);
        })
      }).listen(port);

      logger.info(`Worker ${process.pid} started`);
    }
  }


}

// export default App;