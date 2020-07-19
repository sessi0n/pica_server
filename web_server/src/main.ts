require('./constants/globals');
import 'source-map-support/register';
import App from './App';
import express from "express";

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = App.instance.app;

app.listen(port, () => console.log(`Express server listening at ${port}`))
    .on('error', err => console.error(err));
