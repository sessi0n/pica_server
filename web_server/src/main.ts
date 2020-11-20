import 'source-map-support/register';
import {App} from "./app";

let server_index = process.argv[2];
let s_index = parseInt(server_index);
if (Number.isNaN(s_index) || s_index < 10 || s_index > 99 || !server_index.length) {
  console.log('invalid server INDEX: ' + process.argv[2]);
  process.exit(0);
}

let physical_server_index = Math.trunc(+process.argv[2] % 100 / 10); // 물리적 서버 인덱스
let module_index_in_a_server = +process.argv[2] % 10; // 서버 당 모듈 인덱스

let port = parseInt(process.argv[3]);
if (Number.isNaN(port) || port < 1 || port > 59999) {
  console.log('invalid server PORT: ' + process.argv[3]);
  process.exit(0);
}

const app = new App();

app.init()
.then(() => app.start_worker(port))
.catch((err) => console.log(err));
