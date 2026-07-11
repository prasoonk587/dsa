/**
 * Converts a 1D array into a 2D array with the given dimensions.
 *
 * Elements are assigned row by row: indices `0` to `n - 1` fill the first
 * row, `n` to `2n - 1` fill the second row, and so on.
 *
 * @param original - The source array to reshape.
 * @param m - The number of rows in the resulting array.
 * @param n - The number of columns in the resulting array.
 * @returns The reshaped `m x n` array, or `[]` if `original` doesn't contain
 *   exactly `m * n` elements.
 *
 * @complexity Time: O(m * n) — every element is copied once.
 * @complexity Space: O(m * n) — the output array holds all elements.
 *
 * @example
 * construct2DArray([1, 2, 3, 4], 2, 2);
 * // => [[1, 2], [3, 4]]
 */
function construct2DArray(original: number[], m: number, n: number): number[][] {
    const hasValidDimensions = m * n === original.length;
    if (!hasValidDimensions) return [];

    return Array.from({ length: m }, (_, row) => original.slice(row * n, row * n + n));
}
