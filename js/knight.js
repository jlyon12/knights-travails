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

	let queue = [startPos];
	const searched = new Set([startPos]);
	let movesMade = 0;
	while (queue.length) {
		const next = [];
		while (queue.length) {
			const currentPosition = queue.shift();
			if (String(currentPosition) === String(endPos)) {
				return movesMade;
			}
			for (const direction of potentialDirections) {
				const potentialNextPosition = [
					currentPosition[0] + direction[0], // X coordinate
					currentPosition[1] + direction[1], // Y coordinate
				];

				// Ensure the move would be within the bounds of the board - need to check string value since they have different references
				if (chessBoard.toString().includes(potentialNextPosition.toString())) {
					if (!searched.has(potentialNextPosition)) {
						searched.add(potentialNextPosition);
						next.push(potentialNextPosition);
					}
				}
			}
		}

		movesMade += 1;
		queue = next;
	}
};

knightMoves([1, 1], [3, 5]);
