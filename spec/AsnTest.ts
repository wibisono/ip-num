/**
 * Created by daderemi on 31/07/16.
 */

import {Asn} from "../src/Asn";
import {Validator} from "../src/Validator";

import * as bigInt from "big-integer"

describe('ASN', () => {
    it('should instantiate by passing number to static method', () => {
        expect(Asn.of(1234).getValue()).toEqual(bigInt(1234));
    });
    it('should instantiate by passing well string prefixed with AS to static', () => {
        expect(Asn.of("AS1234").getValue()).toEqual(bigInt(1234));
    });
    it('should instantiate by passing AS in asdot+ format', () => {
        expect(Asn.of("1.10").getValue()).toEqual(bigInt(65546));
        expect(Asn.of("0.65526").getValue()).toEqual(bigInt(65526));
    });
    it('should instantiate by passing a number in string to static', () => {
        expect(Asn.of("1234").getValue()).toEqual(bigInt(1234));
    });
    it('should correctly parse to string value', () => {
        expect(Asn.of(1234).toString()).toEqual("AS1234");
    });
    it('should correctly parse to asdotplus', () => {
        expect(Asn.of(65546).toASDotPlus()).toEqual("1.10");
        expect(Asn.of(65526).toASDotPlus()).toEqual("0.65526");
    });
    it('should correctly parse to asdot', () => {
        // when value is less than 65536
        expect(Asn.of(65535).toASDot()).toEqual("65535");
        // when value is exactly 65536
        expect(Asn.of(65536).toASDot()).toEqual("1.0");
        // When value is more than 65536
        expect(Asn.of(65546).toASDot()).toEqual("1.10");
    });
    it('should correctly parse to binary string', () => {
        expect(Asn.of(65546).toBinaryString()).toEqual("10000000000001010");
        expect(Asn.of(745526).toBinaryString()).toEqual("10110110000000110110");
        expect(Asn.of(1).toBinaryString()).toEqual("1");
        expect(Asn.of(2).toBinaryString()).toEqual("10");
    });
    it('should correctly parse to AS plain value', () => {
        expect(Asn.of(1234).toASPlain()).toEqual("1234");
    });
    it('should throw an exception when number greater than valid ASN range is given', () => {
        expect(() => {Asn.of(Math.pow(2, 32));}).toThrowError(Error,Validator.invalidAsnRangeMessage);
    });
    it('should correctly tell if ASN is 16bit', () => {
        // normal case
        expect(Asn.of(1234).is16Bit()).toEqual(true);
        // edge cases
        expect(Asn.of(Math.pow(2, 16) - 1).is16Bit()).toEqual(true);
        expect(Asn.of(Math.pow(2, 16)).is16Bit()).toEqual(false);
    });
    it('should correctly tell if ASN is 32bit', () => {
        // normal case
        expect(Asn.of(1234).is32Bit()).toEqual(false);
        // edge cases
        expect(Asn.of(Math.pow(2, 32) - 1).is32Bit()).toEqual(true);
    });
    it('should correctly check equality related operations', () => {

        expect(Asn.of(1234).isLessThan(Asn.of(12345))).toEqual(true);
        expect(Asn.of(12345).isLessThan(Asn.of(1234))).toEqual(false);
        expect(Asn.of(12345).isLessThan(Asn.of(12345))).toEqual(false);

        expect(Asn.of(1234).isLessThanOrEquals(Asn.of(12345))).toEqual(true);
        expect(Asn.of(12345).isLessThanOrEquals(Asn.of(1234))).toEqual(false);
        expect(Asn.of(12345).isLessThanOrEquals(Asn.of(12345))).toEqual(true);

        expect(Asn.of(1234).isEquals(Asn.of(1234))).toEqual(true);
        expect(Asn.of(1234).isEquals(Asn.of(12345))).toEqual(false);

        expect(Asn.of(1234).isGreaterThan(Asn.of(12345))).toEqual(false);
        expect(Asn.of(12345).isGreaterThan(Asn.of(1234))).toEqual(true);
        expect(Asn.of(12345).isGreaterThan(Asn.of(12345))).toEqual(false);

        expect(Asn.of(12345).isGreaterThanOrEquals(Asn.of(1234))).toEqual(true);
        expect(Asn.of(1234).isGreaterThanOrEquals(Asn.of(12345))).toEqual(false);
        expect(Asn.of(12345).isGreaterThanOrEquals(Asn.of(12345))).toEqual(true);

    });
    it('should correctly return the next ASN value', () => {
        expect(Asn.of(1234).next().getValue()).toEqual(Asn.of(1235).getValue());
        expect(() => {
            Asn.of(Math.pow(2, 32) - 1).next();
        }).toThrowError(Error, Validator.invalidAsnRangeMessage);
    });
    it('should correctly return the previous ASN value', () => {
        expect(Asn.of(1234).previous().getValue()).toEqual(Asn.of(1233).getValue());
        expect(() => {
            Asn.of(0).previous();
        }).toThrowError(Error, Validator.invalidAsnRangeMessage);
    });
    it('should correctly tell if an ASN has next or previous', () => {
        // next
        expect(Asn.of(1234).hasNext()).toEqual(true);
        expect(Asn.of(Math.pow(2, 32) - 1).hasNext()).toEqual(false);
        // previous
        expect(Asn.of(1).hasPrevious()).toEqual(true);
        expect(Asn.of(0).hasPrevious()).toEqual(false);
    });
});