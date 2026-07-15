// ─── 1. THROTTLE ────────────────────────────────────────────────────────────
// Fires at most once per `limit` ms. The first call goes through immediately
// (leading edge); subsequent calls within the window are dropped.

function throttle<T extends unknown[]>(
    fn: (...args: T) => void,
    limit: number
): (...args: T) => void {
    let lastCall = 0;

    return (...args: T): void => {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            fn(...args);
        }
    };
}

// Usage
const throttled = throttle((x: number) => console.log('throttle:', x), 1000);
throttled(1); // fires
throttled(2); // dropped (within 1 s)

// ─── 2. DEBOUNCE ─────────────────────────────────────────────────────────────
// Fires only after `delay` ms of silence. Resets the timer on every call.
// Useful for search inputs, resize handlers.

function debounce<T extends unknown[]>(
    fn: (...args: T) => void,
    delay: number
): (...args: T) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: T): void => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
}

// Usage
const debounced = debounce((query: string) => console.log('debounce:', query), 300);
debounced('a');
debounced('ab');
debounced('abc'); // only 'abc' fires, 300 ms after this call

// ─── 3. FIXED WINDOW COUNTER ─────────────────────────────────────────────────
// Allows at most `maxCalls` invocations per fixed `windowMs` window.
// The window resets at a fixed cadence (e.g. every full second), so a burst
// straddling a boundary can briefly exceed the rate.

function fixedWindowRateLimiter(maxCalls: number, windowMs: number) {
    let count = 0;
    let windowStart = Date.now();

    return function isAllowed(): boolean {
        const now = Date.now();

        if (now - windowStart >= windowMs) {
            count = 0;
            windowStart = now;
        }

        if (count < maxCalls) {
            count++;
            return true;
        }

        return false;
    };
}

// Usage
const fixedWindow = fixedWindowRateLimiter(3, 1000); // 3 calls per second
console.log('fixed:', fixedWindow()); // true
console.log('fixed:', fixedWindow()); // true
console.log('fixed:', fixedWindow()); // true
console.log('fixed:', fixedWindow()); // false — limit hit

// ─── 4. SLIDING WINDOW LOG ───────────────────────────────────────────────────
// Allows at most `maxCalls` in any rolling window of `windowMs` ms.
// More accurate than fixed window — no boundary burst problem.
// Cost: O(maxCalls) memory to store timestamps.

function slidingWindowRateLimiter(maxCalls: number, windowMs: number) {
    const timestamps: number[] = [];

    return function isAllowed(): boolean {
        const now = Date.now();
        const windowStart = now - windowMs;

        // Evict timestamps outside the current window
        while (timestamps.length > 0 && timestamps[0] <= windowStart) {
            timestamps.shift();
        }

        if (timestamps.length < maxCalls) {
            timestamps.push(now);
            return true;
        }

        return false;
    };
}

// Usage
const slidingWindow = slidingWindowRateLimiter(3, 1000);
console.log('sliding:', slidingWindow()); // true
console.log('sliding:', slidingWindow()); // true
console.log('sliding:', slidingWindow()); // true
console.log('sliding:', slidingWindow()); // false

// ─── 5. TOKEN BUCKET ─────────────────────────────────────────────────────────
// Tokens accumulate at `refillRate` tokens/ms up to `capacity`.
// Each call consumes one token. Allows bursts up to `capacity` while
// enforcing a long-run average of `refillRate * 1000` calls/second.

function tokenBucketRateLimiter(capacity: number, refillRate: number) {
    let tokens = capacity;
    let lastRefill = Date.now();

    return function isAllowed(): boolean {
        const now = Date.now();
        const elapsed = now - lastRefill;

        tokens = Math.min(capacity, tokens + elapsed * refillRate);
        lastRefill = now;

        if (tokens >= 1) {
            tokens--;
            return true;
        }

        return false;
    };
}

// Usage: bucket holds 5 tokens, refills at 1 token/second
const tokenBucket = tokenBucketRateLimiter(5, 1 / 1000);
console.log('token:', tokenBucket()); // true (burst allowed up to capacity)

// ─── 6. LEAKY BUCKET ─────────────────────────────────────────────────────────
// Requests queue up; they are processed (leaked) at a constant `ratePerMs`.
// Enforces a smooth, constant output rate regardless of input bursts.
// Rejects new requests when the queue exceeds `capacity`.

function leakyBucketRateLimiter(capacity: number, ratePerMs: number) {
    let queue = 0;
    let lastLeak = Date.now();

    return function isAllowed(): boolean {
        const now = Date.now();
        const elapsed = now - lastLeak;

        queue = Math.max(0, queue - elapsed * ratePerMs);
        lastLeak = now;

        if (queue < capacity) {
            queue++;
            return true;
        }

        return false;
    };
}

// Usage: queue capacity 5, drains at 1 request/second
const leakyBucket = leakyBucketRateLimiter(5, 1 / 1000);
console.log('leaky:', leakyBucket()); // true
