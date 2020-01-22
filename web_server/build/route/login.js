"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (user, data) {
    const packet = JSON.parse(data);
    console.log(packet.a);
    console.log(packet.b);
};
//# sourceMappingURL=login.js.map