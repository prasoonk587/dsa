/**
 * Computes the average value of nodes on each level of a binary tree.
 *
 * Preorder DFS carrying the depth: each level accumulates a running
 * `[sum, count]` tuple indexed by depth, converted to averages at the end.
 * DFS trades the BFS queue's O(w) width for O(h) recursion depth —
 * preferable on wide trees, riskier on degenerate (skewed) ones.
 *
 * @param root - Root of the binary tree
 * @returns Averages indexed by level, top to bottom
 * @complexity Time: O(n) — every node visited exactly once
 * @complexity Space: O(h) — recursion depth; plus O(h) accumulator/output
 *
 * @example
 * // root = [3, 9, 20, null, null, 15, 7]
 * averageOfLevels(root); // => [3, 14.5, 11]
 */

function averageOfLevels(root: TreeNode | null): number[] {
    const average: number[][] = [];

    const dfs = (node: TreeNode | null, level: number) => {
        if (node === null || node.val === null) return;

        average[level] = average[level] ?? [0, 0];

        let [sum, count] = average[level];

        average[level] = [sum + node.val, count + 1];

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    };

    dfs(root, 0);

    return average.map(([sum, count]) => sum / count);
}
