export default class Board {
	constructor(size) {
		this.size = size;
		this.board = this.#buildBoard();
	}

	#buildBoard() {
		const board = [];
		for (let i = 1; i <= this.size; i += 1) {
			board[i] = [];
			for (let j = 1; j <= this.size; j += 1) {
				board[i][j] = [i, j];
			}
		}

		return board;
	}
}
