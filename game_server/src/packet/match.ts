type json_match = {
    a : number;
    b : string;
};

module.exports = function (client, data) {
    return new Promise((resolve, reject) => {
        let packet = JSON.parse(data);

        console.log(packet.a);
        console.log(packet.b);

        resolve();
    });
};