/**
 * Determines whether `s` is a subsequence of `t`.
 *
 * Two-pointer scan: iterate through `t` once, advancing a pointer into `s`
 * on every character match. `s` is a subsequence when the pointer has
 * consumed all of `s`.
 *
 * @param s - Candidate subsequence
 * @param t - Source string to scan
 * @returns `true` when every character of `s` appears in `t` in order
 * @complexity Time: O(n) — n = t.length; single pass over `t`
 * @complexity Space: O(1) — single integer pointer
 *
 * @example
 * isSubsequence("abc", "ahbgdc"); // => true
 * isSubsequence("axc", "ahbgdc"); // => false
 */
function isSubsequence(s: string, t: string): boolean {
    let matchedCount = 0;

    for (let i = 0; i < t.length; i++) {
        if (t[i] === s[matchedCount]) {
            matchedCount++;
        }
    }

    return matchedCount >= s.length;
}
