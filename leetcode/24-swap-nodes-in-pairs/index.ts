/**
 * Swaps every two adjacent nodes in a singly-linked list and returns the new head.
 *
 * Uses a dummy head node so the first pair is swapped with the same logic as
 * every other pair, avoiding a special case for the list's head.
 *
 * Assumes `ListNode` is the standard LeetCode singly-linked list class:
 * `{ val: number; next: ListNode | null }`.
 *
 * @param head - The head of the linked list to swap in place.
 * @returns The head of the list after adjacent nodes have been swapped in pairs.
 *
 * @complexity Time: O(n) — each node is visited once.
 * @complexity Space: O(1) — only pointers are reassigned; no extra structures.
 *
 * @example
 * swapPairs(toList([1, 2, 3, 4]));
 * // => 2 -> 1 -> 4 -> 3
 */
function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0, head);
    let prev: ListNode = dummy;

    while (prev.next && prev.next.next) {
        const first = prev.next;
        const second = first.next!; // non-null: guaranteed by the while condition

        first.next = second.next;
        second.next = first;
        prev.next = second;

        prev = first;
    }

    return dummy.next;
}
