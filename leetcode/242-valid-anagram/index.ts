/**
 * Determines whether two strings are anagrams of each other.
 * Two strings are anagrams if they contain the same characters
 * with identical frequencies.
 *
 * @param s - The source string
 * @param t - The string to compare against
 * @returns `true` if `s` and `t` are anagrams, `false` otherwise
 *
 * @complexity Time: O(n) — two linear passes over both strings
 * @complexity Space: O(1) — map holds at most 26 keys for lowercase alpha
 *
 * @example
 * isAnagram("anagram", "nagaram"); // => true
 * isAnagram("rat", "car");         // => false
 */
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const freq = new Map<string, number>();

  for (const char of s) freq.set(char, (freq.get(char) ?? 0) + 1);

  for (const char of t) {
    const count = freq.get(char) ?? 0;
    if (count === 0) return false;
    freq.set(char, count - 1);
  }

  return true;
}