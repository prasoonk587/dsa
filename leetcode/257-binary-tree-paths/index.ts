/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

const PATH_SEPARATOR = '->';

/**
 * Returns all root-to-leaf paths in a binary tree, formatted as
 * separator-joined strings (e.g. "1->2->5").
 *
 * Uses depth-first backtracking with a single shared path buffer:
 * each node's value is pushed before descending and popped after,
 * avoiding a new array allocation at every level.
 *
 * @param root - Root of the binary tree (may be null)
 * @returns One formatted string per root-to-leaf path; empty array for an empty tree
 *
 * @complexity Time: O(n * h) — every node is visited once, and each leaf
 *   serializes a path of up to h (tree height) values
 * @complexity Space: O(h) — recursion stack plus the shared path buffer,
 *   excluding the output itself
 *
 * @example
 * binaryTreePaths(tree([1, 2, 3, null, 5]));
 * // => ["1->2->5", "1->3"]
 */
function binaryTreePaths(root: TreeNode | null): string[] {
    const rootToLeafPaths: string[] = [];

    if (root === null) return rootToLeafPaths;

    const currentPath: number[] = [];

    // Backtracking DFS: push on entry, record at leaves, pop on exit.
    const collectPaths = (node: TreeNode): void => {
        currentPath.push(node.val);

        const isLeaf = node.left === null && node.right === null;

        if (isLeaf) {
            rootToLeafPaths.push(currentPath.join(PATH_SEPARATOR));
        } else {
            if (node.left !== null) collectPaths(node.left);
            if (node.right !== null) collectPaths(node.right);
        }

        currentPath.pop();
    };

    collectPaths(root);

    return rootToLeafPaths;
}
