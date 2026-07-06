/**
 * Determines whether `subRoot` appears as a subtree of `root`.
 *
 * For every node in `root` whose value matches `subRoot`'s value,
 * runs a full structural comparison via `isEqual`; otherwise recurses
 * into the left and right children.
 *
 * @param root - Root of the tree being searched
 * @param subRoot - Root of the candidate subtree
 * @returns `true` when a node in `root` starts a subtree identical to `subRoot`
 * @complexity Time: O(m · n) — m = nodes in root, n = nodes in subRoot;
 *   worst case runs isEqual at every node of root
 * @complexity Space: O(h) — recursion depth, h = height of root
 *
 * @example
 * // root = [3,4,5,1,2], subRoot = [4,1,2]
 * isSubtree(root, subRoot); // => true
 */
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (root === null || subRoot === null) return false;

    if (root.val === subRoot.val && isEqual(root, subRoot)) {
        return true;
    }

    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

/**
 * Structurally compares two trees for exact equality of shape and values.
 *
 * @param node1 - Root of the first tree
 * @param node2 - Root of the second tree
 * @returns `true` when both trees are identical in structure and node values
 * @complexity Time: O(min(m, n)) — stops at the first structural or value mismatch
 * @complexity Space: O(h) — recursion depth of the smaller tree
 */
function isEqual(node1: TreeNode | null, node2: TreeNode | null): boolean {
    if (node1 === null && node2 === null) return true;
    if (node1 === null || node2 === null) return false;
    if (node1.val !== node2.val) return false;
    return isEqual(node1.left, node2.left) && isEqual(node1.right, node2.right);
}
