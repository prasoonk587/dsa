/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Determines whether a singly linked list reads the same forwards and backwards.
 *
 * Finds the end of the first half, reverses the second half in place, compares
 * the two halves pairwise, then restores the list to its original shape.
 *
 * @param head - Head of the linked list (may be null or a single node)
 * @returns `true` if the list is a palindrome, otherwise `false`
 *
 * @complexity Time: O(n) — three linear passes: find middle, reverse, compare
 * @complexity Space: O(1) — iterative reversal uses constant extra memory
 *
 * @example
 * isPalindrome(list(1, 2, 2, 1)); // => true
 * isPalindrome(list(1, 2));       // => false
 */
function isPalindrome(head: ListNode | null): boolean {
    if (head === null || head.next === null) return true;

    const lastNodeOfFirstHalf = findMiddle(head);
    const reversedSecondHalf = reverseLinkedList(lastNodeOfFirstHalf.next);

    const isListPalindrome = areEqual(head, reversedSecondHalf);

    // Restore the original list so the input is not left mutated.
    lastNodeOfFirstHalf.next = reverseLinkedList(reversedSecondHalf);

    return isListPalindrome;
}

/**
 * Locates the last node of the first half using slow/fast pointers.
 *
 * For odd-length lists this is the exact middle node; for even-length
 * lists it is the final node of the left half.
 *
 * @param head - Non-null head of the list
 * @returns The node at which the first half ends
 *
 * @complexity Time: O(n) — fast pointer traverses the list once
 * @complexity Space: O(1)
 */
function findMiddle(head: ListNode): ListNode {
    let slowPointer = head;
    let fastPointer = head;

    while (fastPointer.next !== null && fastPointer.next.next !== null) {
        slowPointer = slowPointer.next!;
        fastPointer = fastPointer.next.next;
    }

    return slowPointer;
}

/**
 * Reverses a linked list in place using iteration.
 *
 * @param head - Head of the (sub)list to reverse
 * @returns The new head of the reversed list
 *
 * @complexity Time: O(n)
 * @complexity Space: O(1) — no recursion, so no call-stack growth
 */
function reverseLinkedList(head: ListNode | null): ListNode | null {
    let previousNode: ListNode | null = null;
    let currentNode = head;

    while (currentNode !== null) {
        const nextNode = currentNode.next;
        currentNode.next = previousNode;
        previousNode = currentNode;
        currentNode = nextNode;
    }

    return previousNode;
}

/**
 * Compares two lists value-by-value until either list is exhausted.
 *
 * The loop is driven by both pointers so the check remains safe even if
 * the halves differ in length (the middle node of an odd-length list is
 * intentionally skipped).
 *
 * @param firstHalf - Head of the first half of the original list
 * @param secondHalf - Head of the reversed second half
 * @returns `true` if every compared pair of values matches
 *
 * @complexity Time: O(n / 2) — bounded by the shorter half
 * @complexity Space: O(1)
 */
function areEqual(firstHalf: ListNode | null, secondHalf: ListNode | null): boolean {
    let a = firstHalf;
    let b = secondHalf;

    while (a !== null && b !== null) {
        if (a.val !== b.val) return false;
        a = a.next;
        b = b.next;
    }

    return true;
}
