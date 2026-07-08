/**
 * Binary search for `target` in a sorted, ascending array.
 *
 * Maintains a `[left, right]` candidate window, comparing the middle
 * element each iteration and discarding the half that cannot contain
 * the target until the window is empty.
 *
 * @param nums - Ascending sorted array to search
 * @param target - Value to locate
 * @returns Index of `target`, or -1 if absent
 * @complexity Time: O(log n) — the search window halves each iteration
 * @complexity Space: O(1) — constant index bookkeeping
 *
 * @example
 * search([-1, 0, 3, 5, 9, 12], 9); // => 4
 * search([-1, 0, 3, 5, 9, 12], 2); // => -1
 */
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        if (nums[left] === target) return left;
        if (nums[right] === target) return right;

        const mid = Math.floor((right + left) / 2);
        if (target === nums[mid]) return mid;

        if (target > nums[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

export { search };
