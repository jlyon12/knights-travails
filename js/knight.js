/* eslint-disable no-restricted-syntax */
import Board from './board.js';

const chessBoard = new Board(8).board;

const knightMoves = ([x1, y1], [x2, y2]) => {
	const startPos = [x1, y1];
	const endPos = [x2, y2];
	if (
		x1 > 8 ||
		y1 > 8 ||
		x2 > 8 ||
		y2 > 8 ||
		x1 < 1 ||
		y1 < 1 ||
		x2 < 1 ||
		y2 < 1
	) {
		throw new Error(
			'A Chessboard is 8x8. Please check your starting position and ending position'
		);
	}
	const potentialDirections = [
		[1, 2],
		[2, 1],
		[2, -1],
		[1, -2],
		[-1, -2],
		[-2, -1],
		[-2, 1],
		[-1, 2],
	];

	const queue = [[startPos, 0]];
	// create a map with key = current position , value = previous position
	const searched = new Map([[String(startPos), null]]);
	const path = [];
	while (queue.length) {
		let [currentPosition, distance] = queue.shift();

		if (String(currentPosition) === String(endPos)) {
			// when shortest path is found backtrace the path using the current position/end position by using the seached map
			while (currentPosition !== null) {
				const temp = searched.get(String(currentPosition));
				path.unshift(currentPosition);
				currentPosition = temp;
			}

			const pathOutput = JSON.stringify(path);

			return `The Knight has moved from [${startPos}] to [${endPos}] in ${distance} moves. \nPath: ${pathOutput}`;
		}
		for (const direction of potentialDirections) {
			const potentialNextPosition = [
				currentPosition[0] + direction[0], // X coordinate
				currentPosition[1] + direction[1], // Y coordinate
			];

			// Ensure the move would be within the bounds of the board - need to check string value since they have different references
			if (chessBoard.toString().includes(potentialNextPosition.toString())) {
				if (!searched.has(String(potentialNextPosition))) {
					searched.set(String(potentialNextPosition), String(currentPosition));
					queue.push([potentialNextPosition, distance + 1]);
				}
			}
		}
	}
	return -1;
};
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

export default knightMoves;
