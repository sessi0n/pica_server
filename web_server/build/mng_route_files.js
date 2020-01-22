"use strict";
const file_names = [];
file_names[0] = 'none';
file_names[1001] = 'login';
for (let key in file_names) {
    exports[key] = require('./route/' + file_names[key]);
}
//# sourceMappingURL=mng_route_files.js.map