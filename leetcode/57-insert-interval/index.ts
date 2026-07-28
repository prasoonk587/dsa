/** A closed interval represented as a `[start, end]` tuple. */
export type Interval = readonly [number, number];

/**
 * Inserts a new interval into a sorted list of non-overlapping intervals,
 * merging any intervals that overlap with it, and returns the result still
 * sorted and non-overlapping.
 *
 * @param intervals - Existing intervals, sorted ascending by start and non-overlapping
 * @param newInterval - The interval to insert, as `[start, end]` with `start <= end`
 * @returns A new sorted, non-overlapping list including the merged interval
 * @throws {RangeError} When `newInterval` is not a valid `[start, end]` pair
 *
 * @example
 * insert([[1, 3], [6, 9]], [2, 5]);
 * // => [[1, 5], [6, 9]]
 *
 * @complexity Time: O(n) — single linear pass over the intervals
 * @complexity Space: O(n) — the output array
 */
export function insert(intervals: readonly Interval[], newInterval: Interval): Interval[] {
    const [insertStart, insertEnd] = newInterval;
    if (insertStart > insertEnd) {
        throw new RangeError(
            `newInterval must satisfy start <= end, received [${insertStart}, ${insertEnd}]`
        );
    }

    const result: Interval[] = [];
    const n = intervals.length;
    let i = 0;

    // Phase 1: intervals ending strictly before the new one — no overlap possible.
    while (i < n && intervals[i][1] < insertStart) {
        result.push(intervals[i]);
        i++;
    }

    // Phase 2: intervals that touch or overlap (start <= insertEnd) — absorb them
    // into a single widening interval. `<=` ensures adjacent intervals like
    // [1, 2] and [2, 3] merge into [1, 3].
    let mergedStart = insertStart;
    let mergedEnd = insertEnd;
    while (i < n && intervals[i][0] <= mergedEnd) {
        mergedStart = Math.min(mergedStart, intervals[i][0]);
        mergedEnd = Math.max(mergedEnd, intervals[i][1]);
        i++;
    }
    result.push([mergedStart, mergedEnd]);

    // Phase 3: remaining intervals, all starting after the merged block.
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}
