/**
 * ChaincodeError
 */
export declare class ChaincodeError extends Error {
    private data;
    constructor(key: string, data?: any, stack?: any);
    get serialized(): string;
}
