import knightMoves from './js/knight.js';

console.log(knightMoves([1, 1], [1, 1]));
// Expect 0

console.log(knightMoves([1, 1], [2, 3]));
// Expect 1

console.log(knightMoves([1, 1], [3, 6]));
// Expect 2

console.log(knightMoves([1, 1], [8, 8]));
// Expect 6

console.log(knightMoves([1, 1], [10, 8]));
// Expect Error
