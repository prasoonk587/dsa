const set = new Set<number>([1, 2, 3, 4, 5]);

console.log('1.', set.has(1));
console.log('2.', set.add(6));
console.log('3.', set.delete(1));
console.log('4.', set.keys());
console.log('5.', set.values());
console.log('6.', set.entries());
console.log('6.1', set.size);
console.log('7.', [...set]);
console.log('8.', Array.from(set));
