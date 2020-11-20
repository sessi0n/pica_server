import {read_file, write_file} from "./async_file";
import {CLogin, SLogin} from "../proto/src/packet_pb";

const request = require('supertest');

describe('Test the root path', () => {
    test('It should response the POST method', async (done) => {
        let packet = new CLogin();
        packet.setId('MEA.HFZ.MGD.LQY.MYJ');
        packet.setPlatform(0);
        packet.setLoginType(0);
        let uidx = 11;

        let data : string = await read_file('./test/files/res_register.json') as string;
        if (data) {
            let jData = JSON.parse(data);
            packet.setId(jData.id);
            uidx = jData.uidx;
        }

        let buffer = Buffer.from(packet.serializeBinary()).toString('hex');
        console.log(buffer);

        // const response = await request('172.20.40.215:51723')
        const response = await request('127.0.0.1:51722')
        .post('/CLogin')
        .type('application/x-www-form-urlencoded')
        .send({
            's': uidx, //세션
            'p': buffer
        })
        .then(async (res : any) => {
            console.log('response: '+ JSON.stringify(res.status));

            let obj = Buffer.from(res.body, 'utf8');
            let packet = SLogin.deserializeBinary(obj);
            console.log('data: '+ JSON.stringify(packet.toObject()));

            await write_file('./test/files/res_login.json', JSON.stringify(packet.toObject()));

            done();
        })
        .catch((err:Error) => {
            console.log(err);
            done();
        });
    });
});


