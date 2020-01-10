import * as redis from 'redis'
import * as bluebird from 'bluebird'

export class Redis {

    five: number;

    init(ip: string, port: number): any {
        return new Promise((resolve, reject) => {
            bluebird.promisifyAll(redis.RedisClient.prototype);
            bluebird.promisifyAll(redis.Multi.prototype);

            let opt = {};
            let client = redis.createClient(
                port, ip,
                opt
            );

            client.on('connect', ()=>{ return resolve(client); });
            client.on('error', (err)=>{ return reject(err); });
        });

    }
}