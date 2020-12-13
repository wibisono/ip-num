import { IPv4CidrRange, IPv6CidrRange, RangedSet } from "./IPRange";
import { AbstractIPNum, IPv4, IPv6 } from "./IPNumber";
import { IPv4Prefix, IPv6Prefix } from "./Prefix";
import * as bigInt from "big-integer";
declare type RangeType = RangedSet<IPv4> | RangedSet<IPv6>;
/**
 * Represents a collection of IP {@link RangedSet}'s
 */
export declare class Pool<T extends RangeType> {
    private backingSet;
    /**
     * Convenient method for creating an instance from arrays of {@link IPv4} or {@link IPv6}
     * @param ipNumbers the arrays of {@link IPv4} or {@link IPv6} that will make up the pool.
     */
    static fromIPNumbers(ipNumbers: Array<IPv4> | Array<IPv6>): Pool<RangeType>;
    /**
     * Convenient method for creating an instance from arrays of {@link RangedSet}.
     *
     * @param ipRanges the arrays of {@link RangedSet}'s that will make up the pool.
     */
    static fromRangeSet(ipRanges: Array<RangedSet<AbstractIPNum>>): Pool<RangeType>;
    /**
     * Convenient method for creating an instance from arrays of {@link IPv4CidrRange} or {@link IPv6CidrRange}.
     *
     * @param cidrRanges the arrays of {@link IPv4CidrRange} or {@link IPv6CidrRange} that will make up the pool.
     */
    static fromCidrRanges(cidrRanges: IPv4CidrRange[] | IPv6CidrRange[]): Pool<RangeType>;
    /**
     * Constructor for an IP pool.
     *
     * Creates a Pool of IP ranges from supplied {@link RangedSet}'s
     *
     * @param ranges the array of IP ranges that would make up the pool.
     */
    constructor(ranges: Array<RangedSet<AbstractIPNum>>);
    /**
     * Returns an array of {@link RangedSet}'s that is contained within the pool
     */
    getRanges(): Array<RangedSet<AbstractIPNum>>;
    /**
     * Returns an new {@link Pool} with all the IP ranges aggregated
     */
    aggregate(): Pool<T>;
    /**
     * Gets a single range of size of the given prefix from pool.
     * Only returns a range if there is a single range in the pool of same size or greater than given prefix.
     *
     * throws exception if the requested range cannot be got from the pool.
     *
     * @param prefix prefix range to retrieve
     */
    getSingleCidrRange(prefix: IPv4Prefix | IPv6Prefix): IPv4CidrRange | IPv6CidrRange;
    /**
     * Gets a single or multiple ranges that fulfils the given prefix from the pool.
     *
     * throws exception if the requested range cannot be got from the pool.
     *
     * @param prefix prefix range to retrieve
     */
    getMultipleCidrRanges(prefix: IPv4Prefix | IPv6Prefix): IPv4CidrRange[] | IPv6CidrRange[];
    /**
     * Returns the size of IP numbers in the pool
     */
    getSize(): bigInt.BigInteger;
    /**
     * Empties the pool and fill it with given ranges
     *
     * @param ipRanges the range to fill the pool with after emptying
     */
    resetWith(ipRanges: Array<RangedSet<IPv4 | IPv6>>): void;
    /**
     * Removes the given range from the pool.
     * It is a Noop, if the given range does not exist in the pool
     * @param rangeToRemove range to remove from ppol
     */
    removeExact(rangeToRemove: RangedSet<AbstractIPNum>): void;
    removeOverlapping(rangeToRemove: RangedSet<AbstractIPNum>): void;
    add(range: Array<RangedSet<AbstractIPNum>>): void;
    clear(): void;
}
export {};
