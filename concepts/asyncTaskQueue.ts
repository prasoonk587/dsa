/**
 * Async Task Queue with bounded concurrency.
 *
 * Up to `concurrency` tasks run simultaneously. When a slot frees up,
 * the next pending task starts immediately.
 *
 * Core idea: track `running` count + a `pending` array.
 * `drain()` fills available slots from the front of the queue.
 * Each task calls `drain()` in its `.finally()` to refill the slot it vacated.
 */
class AsyncTaskQueue {
    private readonly concurrency: number;
    private running: number = 0;
    private readonly pending: Array<() => Promise<unknown>> = [];

    constructor(concurrency: number) {
        this.concurrency = concurrency;
    }

    queue(task: () => Promise<unknown>): void {
        this.pending.push(task);
        this.drain();
    }

    private drain(): void {
        while (this.running < this.concurrency && this.pending.length > 0) {
            const task = this.pending.shift()!;
            this.running++;

            task()
                .then((result) => console.log('[resolved]', result))
                .catch((error) => console.error('[rejected]', error))
                .finally(() => {
                    this.running--;
                    this.drain(); // a slot freed — pull the next task
                });
        }
    }
}

// ─── Demo ────────────────────────────────────────────────────────────────────

const taskQueue = new AsyncTaskQueue(2); // 2 concurrent slots

const task1 = () => new Promise((resolve) => setTimeout(() => resolve('Task 1 done'), 1000));
const task2 = () => new Promise((_, reject) => setTimeout(() => reject('Task 2 failed'), 500));
const task3 = () => new Promise((resolve) => setTimeout(() => resolve('Task 3 done'), 200));

taskQueue.queue(task1); // slot 1 — starts immediately
taskQueue.queue(task2); // slot 2 — starts immediately
taskQueue.queue(task3); // pending — waits for a slot

// Timeline:
//   t=0    task1 starts, task2 starts
//   t=500  task2 rejects → slot freed → task3 starts
//   t=700  task3 resolves (200 ms after t=500)
//   t=1000 task1 resolves
//
// Output:
//   [rejected] Task 2 failed
//   [resolved] Task 3 done
//   [resolved] Task 1 done
