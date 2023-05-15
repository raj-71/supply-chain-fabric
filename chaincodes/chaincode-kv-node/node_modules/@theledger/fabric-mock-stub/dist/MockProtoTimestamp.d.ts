import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
export declare class MockProtoTimestamp extends Timestamp {
    seconds: number;
    nanos: number;
    constructor();
    getSeconds(): number;
    toDate(): Date;
}
