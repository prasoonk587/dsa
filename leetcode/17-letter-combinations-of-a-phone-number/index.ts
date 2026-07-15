/** Maps phone keypad digits to the letters they can produce. */
const DIGIT_TO_LETTERS = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
} as const;

type PhoneDigit = keyof typeof DIGIT_TO_LETTERS;

/** Narrows an arbitrary character to a valid phone keypad digit (2–9). */
const isPhoneDigit = (char: string): char is PhoneDigit => char in DIGIT_TO_LETTERS;

/**
 * Returns all letter combinations the given phone keypad digits could represent.
 *
 * @param digits - A string of digits, each in the range 2–9
 * @returns Every possible letter combination in keypad order; an empty array
 *   when `digits` is empty
 * @throws {TypeError} When `digits` contains a character outside 2–9
 * @complexity Time: O(n · 4^n) — up to 4 letters per digit, each of the 4^n
 *   combinations costs O(n) to build
 * @complexity Space: O(n) auxiliary for recursion depth, O(n · 4^n) for output
 * @example
 * letterCombinations('23');
 * // => ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']
 */
function letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];

    const invalidChar = [...digits].find((char) => !isPhoneDigit(char));
    if (invalidChar !== undefined) {
        throw new TypeError(`Invalid digit "${invalidChar}": expected characters in range 2-9`);
    }

    const result: string[] = [];

    // Depth-first backtracking: extend `current` with each letter of the digit at `index`.
    const buildCombinations = (index: number, current: string): void => {
        if (index === digits.length) {
            result.push(current);
            return;
        }

        const letters = DIGIT_TO_LETTERS[digits[index] as PhoneDigit];
        for (const letter of letters) {
            buildCombinations(index + 1, current + letter);
        }
    };

    buildCombinations(0, '');

    return result;
}

export { letterCombinations };
