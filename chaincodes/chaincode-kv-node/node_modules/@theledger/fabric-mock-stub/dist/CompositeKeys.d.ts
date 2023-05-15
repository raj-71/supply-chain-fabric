import { SplitCompositekey } from 'fabric-shim';
/**
 * @hidden
 */
export declare class CompositeKeys {
    static MIN_UNICODE_RUNE_VALUE: string;
    static MAX_UNICODE_RUNE_VALUE: string;
    static COMPOSITEKEY_NS: string;
    static EMPTY_KEY_SUBSTITUTE: string;
    static createCompositeKey(objectType: string, attributes: string[]): string;
    static splitCompositeKey(compositeKey: string): SplitCompositekey;
    static validateCompositeKeyAttribute(attr: string): boolean;
}
