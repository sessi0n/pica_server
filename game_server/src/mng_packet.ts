/*
    [custom head : app_id(4) | protocol(4) | size(4) | uid(4)]
    [data : protocol-buf > index array | data array]
    이거 잘못됐다. 엔디안 검사 안하려구 프로토 버프 쓰는건데 이렇게 하면 헤드를 파싱할때 엔디안 검사해야한다.
 */

const protobuf = require("protobufjs");

export type proto_style = {
    e_index : number;
    i_index : number;
    json_pack : string; //JSON
}


type custom_style = {
    app_id : number; // A game, B game...
    e_index : number; // protobuf enum ePACKETS index
    size : number; // packet size (custom head + data)
    uuid : number; // web virtual id
    data : Buffer; // data > protobuf
}

export class cPacketMng {
    private trans_files : any = require('./mng_packet_files');
    private protocol_path : string = '../_protocol.PROTO';
    private root : any;

    constructor() {
        this.load_protobuf(this.protocol_path)
            .catch((err) => {});
    }

    load_protobuf(protocol_path) {
        return new Promise((resolve, reject) => {
            protobuf.load(this.protocol_path)
                .then((root) => this.root = root )
                .catch((err) => {

                })
        });
    }

    get_proto_style(data : Buffer) : proto_style {
        let AwesomeMessage = this.root.lookupType("home.sessi0n.test.RequestAwesomeMessage");

        let message = AwesomeMessage.decode(data);

        return message;
    }

    get_custom_style(data : Buffer) : custom_style {
        /*
        c# (unity) 는 리틀엔디안 사용
        java 는 빅엔디안 사용
        예전에 이렇게 사용. 이게 좋은점은 프로토 버프 인덱스를 커스텀해서 알수 있음.
        별로 인점은 포로토 버프 사용 이유가 반감됨. 레디안 무시하려고 쓰는건데 이걸 또 해야함.
         */
        let app_id : number = data.readInt32LE(0);
        let protocol : number = data.readInt32LE(4);
        let size : number = data.readInt32LE(8);
        let uuid : number = data.readInt32LE(12);
        let packet : Buffer = data.slice(16, 16+size);

        return {
            app_id: app_id,
            e_index: protocol,
            size: size,
            uuid: uuid,
            data: packet
        };
    };

    get_exports(e_index : number) {
        return this.trans_files[e_index.toString()];
    }

    get_awesome_message(send_obj) {
        return new Promise((resolve, reject) => {
            let AwesomeMessage = this.root.lookup('ResponseAwesomeMessage');

            let err = AwesomeMessage.verify(send_obj);
            if (err) {
                return reject(err);
            }

            let message = AwesomeMessage.create(send_obj);
            let buffer = AwesomeMessage.encode(message).finish();

            resolve(buffer);
        })
    }
}