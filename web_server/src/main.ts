import 'source-map-support/register';
import App from './App';
// import express from "express";
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


const port: number = Number(process.env.PORT) || 3000;
// const app: express.Application = App.instance.app;

// app.listen(port, () => console.log(`Express server listening at ${port}`))
//     .on('error', err => console.error(err));

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker:any, code:any, signal:any) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req:any, res:any) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}