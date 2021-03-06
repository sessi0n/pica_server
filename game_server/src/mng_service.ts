import net = require('net');
import { cGameMng } from './mng_game';
import { proto_style, cPacketMng } from './mng_packet';

import * as table from 'src/mng_table';
import {types} from "util";
import {cUser} from "./c_user";
// import isUint8Array = module

export class cService {
    private static _instance : cService;
    private _game_manager : cGameMng = new cGameMng();
    private _packet_manager : cPacketMng = new cPacketMng();

    private _port : number = 0;

    public static get instance(): cService {
        return this._instance || (this._instance = new this());
    }

    public start_service() {
        this.init_service()
            .then(() => this.init_rdb())
            .then(() => this.init_nosql())
            .then(() => this.listen_server())
            .catch((err) => {
                console.log(`[CService ERROR] not load service: ${err}`);
            })
    }

    private async init_service() {
        return new Promise((resolve, reject) => {
            console.log(`[init_service] `);
            return resolve();
        })
    }

    private async init_rdb() {
        return new Promise((resolve, reject) => {
            console.log(`[init_rdb] `);
            return resolve();
        })
    }

    private async init_nosql() {
        return new Promise((resolve, reject) => {
            console.log(`[init_nosql] `);
            return resolve();
        })
    }

    private async listen_server() {
        let self = this;
        let server = net.createServer(function (client : net.Socket) {
            client.setTimeout(60 * 1000);

            let user = new cUser(client, -1);

            // client.setEncoding('utf8');

            client.on('data', function (data) {
                self.parse_data(user, data)
                    .catch((err) => {
                        console.log(`data error: ${err} `);
                    });
                console.log(` ${data} `);
            });
            client.on('end', function () { //client 에서 끊었을 경우 생기는 현상
                console.log(`client end `);
            });
            client.on('close', function () { //server 에서 끊었을 경우 생기는 현상
                console.log(`client close`);
            });
            client.on('error', function (err) {
                console.log(`client error:  ${err} `);
            });
            client.on('timeout', function () {
                console.log('client timeout');
            });
        }).listen(this._port, function () {
            console.log('server start listening');
            server.on('close', function () {
                console.log(`server close`);
            });
            server.on('error', function (err) {
                console.log(`server error: ${err} `);
            });
        });
    }

    async parse_data(user: cUser, data: Buffer) {
        return new Promise((resolve, reject) => {
            let packet : proto_style = this._packet_manager.get_proto_style(data);
            // let packet : custom_style = this.get_custom_style(data);

            let fn = this._packet_manager.get_exports(packet.e_index);
            fn.call(this, user, packet.json_pack)
                .catch((err: Error) => {
                });

            return resolve();
        })
    }

    send_packet(client : net.Socket, e_index : number, send_obj : JSON) {
        this._packet_manager.get_awesome_message(send_obj)
            .then((buffer) => {
                client.write(buffer, (err) => {
                        if (err) {

                        }
                    });
                }
            )
            .catch((err : Error) => { });

    }

}

