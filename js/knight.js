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
	const searched = new Map();
	searched.set(startPos, null);
	let path = [[String(endPos)]];
	while (queue.length) {
		const [currentPosition, distance] = queue.shift();

		if (String(currentPosition) === String(endPos)) {
			let current = endPos;
			while (String(current) !== String(startPos)) {
				let temp = searched.get(String(current));
				path.unshift([searched.get(String(current))]);
				current = temp;
				path;
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
