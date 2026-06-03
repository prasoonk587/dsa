/**
 * Finds the length of the longest substring without repeating characters.
 * Approach: Sliding window
 * Time: O(n) | Space: O(n)
 */
function lengthOfLongestSubstring(s: string): number {
    let left: number = 0;
    let right: number = 0;
    let maxLength: number = 0;
    const stringLength: number = s.length;
    const charIndexMap: Record<string, number> = {};

    while (right < stringLength && left < stringLength) {
        const char: string = s[right];
        const isCharInWindow: boolean = charIndexMap[char] !== undefined && charIndexMap[char] >= left;

        if (isCharInWindow) {
            left = charIndexMap[char] + 1;
        }

        const currentWindowLength: number = right - left + 1;
        maxLength = Math.max(maxLength, currentWindowLength);

        charIndexMap[char] = right;
        right++;
    }

    return maxLength;
}. 