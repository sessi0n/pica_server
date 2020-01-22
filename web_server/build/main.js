"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register"); // source-map을 사용하기 위해 추가함.
const App_1 = __importDefault(require("./App"));
const port = Number(process.env.PORT) || 3000;
const app = new App_1.default().app;
app.listen(port, () => console.log(`Express server listening at ${port}`))
    .on('error', err => console.error(err));
//# sourceMappingURL=main.js.map