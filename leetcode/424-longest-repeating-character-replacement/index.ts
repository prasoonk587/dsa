const UPPERCASE_A_CHAR_CODE = 65;

/**
 * Finds the length of the longest substring containing the same letter
 * after replacing at most `maxReplacements` characters.
 *
 * Uses a sliding window where the window is valid as long as
 * (windowSize - maxCharFrequency) <= maxReplacements.
 *
 * @param input - The uppercase English letter string to evaluate
 * @param maxReplacements - Maximum number of character replacements allowed
 * @returns The length of the longest valid substring
 *
 * @complexity Time: O(n) — single pass with two pointers
 * @complexity Space: O(1) — fixed-size frequency array of 26 characters
 *
 * @example
 * characterReplacement("AABABBA", 1); // => 4
 * characterReplacement("ABAB", 2);    // => 4
 */
function characterReplacement(input: string, maxReplacements: number): number {
    let left: number = 0;
    let maxCharFrequency: number = 0;
    let result: number = 0;
    const charFrequency: number[] = Array(26).fill(0);

    for (let right = 0; right < input.length; right++) {
        const charCode = input.charCodeAt(right) - UPPERCASE_A_CHAR_CODE;
        charFrequency[charCode]++;

        maxCharFrequency = Math.max(maxCharFrequency, charFrequency[charCode]);

        const windowSize = right - left + 1;
        const replacementsNeeded = windowSize - maxCharFrequency;

        if (replacementsNeeded > maxReplacements) {
            charFrequency[input.charCodeAt(left) - UPPERCASE_A_CHAR_CODE]--;
            left++;
        }

        result = Math.max(result, right - left + 1);
    }

    return result;
}