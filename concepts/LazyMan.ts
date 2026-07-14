type task = () => Promise<void>;

class LazyManClass {
    private name: string;

    private tasks: task[] = [];

    constructor(name: string) {
        this.name = name;

        this.tasks.push(async () => {
            console.log(`Hi I am ${this.name}`);
        });

        setTimeout(() => this.run(), 0);
    }

    sleep(time: number) {
        this.tasks.push(async () => {
            console.log(`(wait ${time}s)`);
            return new Promise((resolve) => setTimeout(() => resolve(), time * 1000));
        });
        return this;
    }

    eat(meal: string) {
        this.tasks.push(async () => {
            console.log(`I am eating ${meal}`);
        });

        return this;
    }

    sleepFirst(time: number) {
        this.tasks.unshift(async () => {
            console.log(`(wait ${time}s)`);
            return new Promise((resolve) => setTimeout(() => resolve(), time * 1000));
        });

        return this;
    }

    private async run(): Promise<void> {
        for (const task of this.tasks) await task();
    }
}

function LazyMan(name: string) {
    return new LazyManClass(name);
}

// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(2).eat('lunch');
// Hi I am Tony
// (wait 2s)
// I am eating lunch

LazyMan('Tony').eat('lunch').sleepFirst(3).eat('dinner');
// (wait 3s)  ← sleepFirst jumps to the FRONT of the queue
// Hi I am Tony
// I am eating lunch
// I am eating dinner
