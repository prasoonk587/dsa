/**
 * Removes all nodes with the given value from a singly-linked list.
 * (LeetCode 203 — Remove Linked List Elements.)
 *
 * Uses a sentinel (dummy) head so that deleting the original head
 * requires no special-case handling.
 *
 * @param head - Head of the input list (possibly null)
 * @param val - Value whose nodes should all be removed
 * @returns Head of the filtered list (null when every node is removed)
 *
 * @example
 * // 1 → 2 → 6 → 3 → 6, val = 6
 * removeElements(head, 6);
 * // => 1 → 2 → 3
 *
 * @complexity Time: O(n) — each node visited exactly once
 * @complexity Space: O(1) — pointers only, list mutated in place
 */
export function removeElements(head: ListNode | null, val: number): ListNode | null {
    const sentinel = new ListNode(0, head);
    let current = sentinel;

    while (current.next !== null) {
        if (current.next.val === val) {
            // Unlink the matching node; do not advance — the new next needs checking too
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return sentinel.next;
}
