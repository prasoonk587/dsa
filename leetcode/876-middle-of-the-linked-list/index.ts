/**
 * Standard LeetCode singly-linked list node.
 */
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

/**
 * Returns the middle node of a singly-linked list.
 *
 * Fast/slow two-pointer traversal: `right` advances two nodes per step,
 * `left` advances one — so when `right` reaches the end, `left` sits at
 * the midpoint. For even-length lists this returns the *second* of the
 * two middle nodes, per LeetCode 876.
 *
 * @param head - Head of the list (may be null)
 * @returns The middle node, or null for an empty list
 * @complexity Time: O(n) — single pass; the fast pointer visits every node
 * @complexity Space: O(1) — two pointers, no extra structure
 *
 * @example
 * // 1 -> 2 -> 3 -> 4 -> 5      => node 3
 * // 1 -> 2 -> 3 -> 4 -> 5 -> 6 => node 4 (second middle)
 */
function middleNode(head: ListNode | null): ListNode | null {
    if (!head) return head;
    let left = head;
    let right = head;

    while (right && right.next) {
        left = left.next!;
        right = right.next.next!;
    }

    return left;
}

export { middleNode, ListNode };
