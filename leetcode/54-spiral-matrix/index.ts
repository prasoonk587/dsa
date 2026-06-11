/**
 * Traverses a 2D matrix in spiral order and returns all elements.
 *
 * @param matrix - An m×n matrix of integers
 * @returns All elements of the matrix in clockwise spiral order
 *
 * @complexity Time: O(m * n) — every cell visited exactly once
 * @complexity Space: O(m * n) — result array
 *
 * @example
 * spiralOrder([[1,2,3],[4,5,6],[7,8,9]]);
 * // => [1,2,3,6,9,8,7,4,5]
 */
function spiralOrder(matrix: number[][]): number[] {
  const [m, n] = [matrix.length, matrix[0].length];
  let [i, j] = [0, 0];
  let top = 0, bottom = m - 1;
  let left = 0, right = n - 1;

  const result: number[] = [];

  while (result.length < m * n) {
    result.push(matrix[i][j]);

    if (j < right && i === top) { j++; continue; }   // → traversing top row
    if (j === right && i < bottom) { i++; continue; } // ↓ traversing right col
    if (i === bottom && j > left) { j--; continue; }  // ← traversing bottom row
    if (j === left && i > top) { i--; }               // ↑ traversing left col

    // completed one full spiral layer — shrink boundaries inward
    if (i === top && j === left) {
      top++; bottom--; left++; right--;
    }
  }

  return result;
}