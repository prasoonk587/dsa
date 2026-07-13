/**
 * Generates all possible permutations of a set of distinct integers.
 *
 * @param nums - Array of distinct integers to permute
 * @returns All possible orderings of `nums`, where each permutation is an array
 * @throws {Error} When `nums` contains duplicate values
 * @complexity Time: O(n! * n) — n! permutations exist, each requiring O(n) to copy into the result
 * @complexity Space: O(n) — recursion depth plus the `current` and `used` tracking arrays, excluding output
 *
 * @example
 * permute([1, 2, 3]);
 * // => [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
 */
function permute(nums: number[]): number[][] {
    if (new Set(nums).size !== nums.length) {
        throw new Error('permute requires an array of distinct integers');
    }

    const result: number[][] = [];
    const current: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);

    // Builds one permutation at a time via DFS, backtracking after each branch completes.
    const backtrack = (): void => {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            current.push(nums[i]);
            used[i] = true;

            backtrack();

            used[i] = false;
            current.pop();
        }
    };

    backtrack();

    return result;
}

export { permute };
