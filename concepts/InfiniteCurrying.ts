type CurryFn = {
    (): number;
    (n: number): CurryFn;
};

// function sum(acc: number = 0): CurryFn {
//     return function (arg?: number): any {
//         if (arg === undefined) return acc;
//         return sum(acc + arg);
//     };
// }

// type CurryFn = (arg: number) => number | CurryFn;

function sum(...args: number[]): any {
    let acc = args.reduce((acc, curr) => acc + curr, 0);

    return function newSum(...newArg: number[]) {
        if (newArg.length === 0) return acc;
        acc = newArg.reduce((acc, curr) => acc + curr, acc);

        return newSum;
    };
}

console.log(sum(1)(2)(3)(4)()); // => 10
console.log(sum()); // => 10
