const REQUIRED_CHARS = ['a', 'b', 'c'] as const;

/**
 * Counts substrings of `s` that contain at least one occurrence of each
 * required character ('a', 'b', 'c').
 *
 * Uses a sliding window: for each right boundary, tracks the most recent
 * index of each required character. Once all three have appeared, every
 * substring starting at or before the earliest of these "last seen"
 * indices and ending at `right` is valid.
 *
 * @param s - Input string consisting of lowercase English letters
 * @returns Count of substrings containing at least one 'a', 'b', and 'c'
 * @complexity Time: O(n) — single pass; Map operations are O(1) amortized
 * @complexity Space: O(1) — lastSeen map holds at most 3 entries
 * @example
 * numberOfSubstrings("abcabc");
 * // => 10
 */
function numberOfSubstrings(s: string): number {
    if (s.length < REQUIRED_CHARS.length) {
        return 0;
    }

    const lastSeen = new Map<string, number>();
    let count = 0;

    for (let right = 0; right < s.length; right++) {
        lastSeen.set(s[right], right);

        if (lastSeen.size === REQUIRED_CHARS.length) {
            // Safe to assert: size check guarantees all three keys exist
            const minLastSeenIndex = Math.min(
                lastSeen.get('a')!,
                lastSeen.get('b')!,
                lastSeen.get('c')!,
            );

            count += minLastSeenIndex + 1;
        }
    }

    return count;
}