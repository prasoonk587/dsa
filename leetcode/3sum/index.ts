/**
 * Finds all unique triplets in the array that sum to zero.
 * Approach: Sort + Two Pointers (2Sum as inner helper)
 * Time: O(n²) | Space: O(n) — slice per iteration
 */
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    /**
     * Finds all unique pairs in a sorted array that sum to target.
     * Time: O(n) | Space: O(1) excluding output
     */
    function twoSum(target: number, sortedNums: number[]): number[][] {
        const pairs: number[][] = [];
        let left: number = 0;
        let right: number = sortedNums.length - 1;

        while (left < right) {
            const sum: number = sortedNums[left] + sortedNums[right];

            if (sum === target) {
                pairs.push([sortedNums[left], sortedNums[right]]);

                while (left < right && sortedNums[left] === sortedNums[left + 1]) left++;
                while (left < right && sortedNums[right] === sortedNums[right - 1]) right--;

                left++;
                right--;
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }

        return pairs;
    }

    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        const pairs = twoSum(-nums[i], nums.slice(i + 1));
        pairs.forEach((pair) => result.push([nums[i], ...pair]));
    }

    return result;
}