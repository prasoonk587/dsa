class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

/**
 * Rotates a singly-linked list to the right by `k` places.
 *
 * Works by measuring the length, joining the tail to the head to form a cycle,
 * then breaking the cycle at the new tail — the node `length - (k % length)`
 * steps from the original head.
 *
 * @param head - Head of the list, or `null` for an empty list
 * @param k - Number of places to rotate right; values larger than the length wrap
 * @returns The head of the rotated list
 *
 * @example
 * // 1->2->3->4->5, k = 2  =>  4->5->1->2->3
 *
 * @complexity Time: O(n) — one pass to measure, a partial pass to split
 * @complexity Space: O(1) — pointer rewiring only, no extra allocation
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // Empty or single-node lists are unaffected by rotation.
    if (head === null || head.next === null) {
        return head;
    }

    // 1. Measure length and grab the tail.
    let tail = head;
    let length = 1;
    while (tail.next !== null) {
        tail = tail.next;
        length++;
    }

    // 2. Normalize k; a full-cycle rotation is a no-op.
    const effectiveRotation = k % length;
    if (effectiveRotation === 0) {
        return head;
    }

    // 3. Close the list into a cycle.
    tail.next = head;

    // 4. Walk to the new tail: length - effectiveRotation nodes from the head.
    //    Take (steps - 1) hops so newTail lands on the node before the new head.
    const stepsToNewTail = length - effectiveRotation;
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next as ListNode; // guaranteed non-null within the cycle
    }

    // 5. Break the cycle: the node after newTail becomes the new head.
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}
