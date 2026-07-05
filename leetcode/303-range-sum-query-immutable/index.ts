/**
 * Answers immutable range-sum queries in O(1) via precomputed prefix sums.
 *
 * Invariant: prefix[i] = sum of nums[0..i-1], with prefix[0] = 0,
 * so sum(left..right) = prefix[right + 1] - prefix[left].
 *
 * @example
 * const numArray = new NumArray([1, 2, 3, 4, 5]);
 * numArray.sumRange(2, 4);
 * // => 12
 */
class NumArray {
    private readonly prefix: number[];

    /**
     * Builds the prefix-sum table from the source array.
     *
     * @param nums - Source array; not retained after construction
     *
     * @complexity Time: O(n) — single pass over nums
     * @complexity Space: O(n) — prefix table of length n + 1
     */
    constructor(nums: number[]) {
        this.prefix = Array(nums.length + 1).fill(0);

        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }
    /**
     * Returns the inclusive sum of elements in [left, right].
     *
     * @param left - Start index (inclusive, 0-based)
     * @param right - End index (inclusive, 0-based)
     * @returns Sum of nums[left..right]
     * @throws {RangeError} When indices are out of bounds or left > right
     *
     * @complexity Time: O(1) — two lookups and a subtraction
     * @complexity Space: O(1)
     */
    sumRange(left: number, right: number): number {
        return this.prefix[right + 1] - this.prefix[left];
    }
}
