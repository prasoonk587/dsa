/**
 * A faithful re-implementation of the built-in `Object.groupBy`.
 *
 * Groups the elements of an iterable into a null-prototype object keyed by the
 * value the callback returns for each element. Matches the spec in the ways
 * that matter:
 *   - accepts any iterable, not just arrays;
 *   - passes `(item, index)` to the callback;
 *   - coerces keys to property keys (string or symbol);
 *   - returns an object with a `null` prototype (so keys like `toString`
 *     or `__proto__` don't collide with inherited members).
 */
export function groupBy<T, K extends PropertyKey>(
    items: Iterable<T>,
    keySelector: (item: T, index: number) => K
): Partial<Record<K, T[]>> {
    const result = Object.create(null) as Record<K, T[]>;

    let index = 0;
    for (const item of items) {
        const key = keySelector(item, index++);
        (result[key] ??= []).push(item);
    }

    return result;
}

export default groupBy;
