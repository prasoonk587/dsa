/**
 * Converts a string into its zigzag pattern arrangement and reads it row by row.
 * (LeetCode 6 — Zigzag Conversion.)
 *
 * @param s - The string to rearrange
 * @param numRows - Number of rows in the zigzag pattern; must be a positive integer
 * @returns The row-by-row reading of the zigzag arrangement
 * @throws {RangeError} When `numRows` is less than 1
 *
 * @example
 * convert('PAYPALISHIRING', 3);
 * // => 'PAHNAPLSIIGYIR'
 *
 * @complexity Time: O(n) — single pass over the input string
 * @complexity Space: O(n) — row buffers hold every character exactly once
 */
export function convert(s: string, numRows: number): string {
    if (numRows < 1) {
        throw new RangeError(`numRows must be a positive integer, received: ${numRows}`);
    }

    if (numRows === 1 || numRows >= s.length) {
        return s;
    }

    const rows: string[] = Array.from({ length: numRows }, () => '');

    let currentRow = 0;
    let step = 1; // +1 while traversing down, -1 while traversing up

    for (const character of s) {
        rows[currentRow] += character;

        // Reverse direction at the top and bottom boundary rows.
        if (currentRow === 0) {
            step = 1;
        } else if (currentRow === numRows - 1) {
            step = -1;
        }

        currentRow += step;
    }

    return rows.join('');
}
