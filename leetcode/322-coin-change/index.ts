const UNREACHABLE = Infinity;

/**
 * Computes the minimum number of coins needed to make up a given amount,
 * using an unlimited supply of each coin denomination.
 *
 * @param coins - Available coin denominations (each usable an unlimited number of times).
 * @param amount - The target amount to make change for.
 * @returns The fewest coins needed to make `amount`, or `-1` if it cannot be made.
 * @throws {RangeError} When `amount` is negative.
 * @complexity Time: O(amount * coins.length) — for each amount from 1 to target, every coin is tried once.
 * @complexity Space: O(amount) — the `minCoinsForAmount` DP array.
 * @example
 * coinChange([1, 2, 5], 11);
 * // => 3 (5 + 5 + 1)
 */
function coinChange(coins: readonly number[], amount: number): number {
  if (amount < 0) {
    throw new RangeError(`amount must be non-negative, received: ${amount}`);
  }

  const minCoinsForAmount: number[] = Array(amount + 1).fill(UNREACHABLE);
  minCoinsForAmount[0] = 0;

  for (let targetAmount = 1; targetAmount <= amount; targetAmount++) {
    for (const coin of coins) {
      if (coin <= targetAmount && minCoinsForAmount[targetAmount - coin] !== UNREACHABLE) {
        minCoinsForAmount[targetAmount] = Math.min(
          minCoinsForAmount[targetAmount],
          minCoinsForAmount[targetAmount - coin] + 1
        );
      }
    }
  }

  return minCoinsForAmount[amount] === UNREACHABLE ? -1 : minCoinsForAmount[amount];
}