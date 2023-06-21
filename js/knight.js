/* eslint-disable no-restricted-syntax */
import Board from './board.js';

const chessBoard = new Board(8).board;

const knightMoves = ([x1, y1], [x2, y2]) => {
	const startPos = [x1, y1];
	const endPos = [x2, y2];

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
	// initialize array with end position to push shortest path to
	const path = [[String(endPos)]];
	while (queue.length) {
		let [currentPosition, distance] = queue.shift();

		if (String(currentPosition) === String(endPos)) {
			// when shortest path is found backtrace the path using the current position/end position by using the seached map
			for (let i = distance; i <= distance + 1; i += 1) {
				const temp = searched.get(String(currentPosition));
				path.unshift([temp]);
				currentPosition = temp;
			}

			return { distance, path };
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
};

knightMoves([1, 1], [1, 5]);
