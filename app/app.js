var aux;

class Puzzle {
	constructor(size) {
		this.size = size;

		this.board = new Board(size, this);
		this.picture = new Picture(size, this);
	}

	move(direction) {
		var movable, movement, complete;
		
		// Detect movable piece in function of direction
		movable = this.picture.detectMovable(direction);

		// If movement is possible ...
		if (movable) {
			movement = movable.move(direction); // movement [startPos, endPos]
		
			// Update board empty cell
			this.board.updateEmptyCell(movement[0], movement[1]);

			/*// Check if picture is complete
			if (this.picture.checkComplete()) {
				console.log('Complete!'); // TEST
			}	*/

			// Return movable piece coords and complete state, in order to be used in view
			return movable;
		}
	}

	checkFinished() {
		return this.picture.checkComplete();
	}

}

class Board {
	constructor(size, game) {
		this.game = game;

		// Generate cells array based in size
		this.cells = [];
		for (let row = 0; row < size; row++) {
			this.cells.push([]);
			for (let col = 0; col < size; col++) {
				this.cells[row].push(new Cell(row, col));
			}
		}

	}

	detectEmptyCell() {
		var emptyCell;
		for (let row = 0; row < this.game.size; row ++) {
			for (let col = 0; col < this.game.size; col ++) {
				if (this.game.board.cells[row][col].empty) {
					emptyCell = this.game.board.cells[row][col];
				}
			}
		}

		return emptyCell;
	}

	updateEmptyCell(startPos, endPos){
		this.cells[startPos[0]][startPos[1]].empty = true;
		this.cells[endPos[0]][endPos[1]].empty = false;
	}
}

class Cell {
	constructor(row, col) {
		this.empty = true;
		this.position = [row, col];
	}
}

class Picture {
	constructor(size, game) {
		/**
		* @param {Number} size
		* @param {Board} board
		*/

		this.game = game;

		// Generate pieces array based in size
		// This array is the same that board cells array but with one empty position
		this.pieces = [];
		for (let row = 0; row < size; row++) {
			this.pieces.push([]);
			for (let col = 0; col < size; col++) {


				// Create piece with correct position if it is not the last one in the last row
				if (row != size - 1 || col != size -1) {
					var piece = new Piece(row, col, this);
					this.pieces[row].push(piece);

					// Bind piece to random position
					piece.bindStartingPosition();
				} else {
					this.pieces[row].push(null);
				}
			}
		}		
	}

	detectMovable(direction) {
		// Detect movable piece in function of direction

		var emptyCell = this.game.board.detectEmptyCell();
		var movableStr, movableCoords, movable;

		var x = parseInt(emptyCell.position[0]);
		var y = parseInt(emptyCell.position[1]);

		switch (direction) {
			case 'up':
				movableStr = this.map[`${x+1}-${y}`];
				break;
			case 'right':
				movableStr = this.map[`${x}-${y-1}`];
				break;
			case 'down':
				movableStr = this.map[`${x-1}-${y}`];
				break;
			case 'left':
				movableStr = this.map[`${x}-${y+1}`];
				break;
		}

		if (movableStr) {
			movableCoords = movableStr.split('-');
			movable = this.pieces[parseInt(movableCoords[0])][parseInt(movableCoords[1])];
		} else {
			movable = null;
		}

		return movable;
	}

	get map() {
		// var map = [];
		var map = {};
		// for (let row = 0; row < this.pieces.length; row++) {
		// 	map.push([]);
		// }

		this.pieces.forEach(function(row){
			row.forEach(function(piece){
				// map[piece.position[0]][piece.position[1]] = piece;
				if (piece) {
					map[`${piece.position[0]}-${piece.position[1]}`] = `${piece.correctPosition[0]}-${piece.correctPosition[1]}`;
				} 
			});
		});
		return map;
	}


	checkComplete() {

		aux = [];
		for (let row = 0; row < this.game.size; row++) {
			aux.push(
				this.pieces[row].every(function(value){
					if (value === null) {
						return true;
					} else {
						return value.match;
					}
				})
			);
		}

		return aux.every(function(value){
				return value;
			});
	}

}

class Piece {
	constructor(row, col, pict) {

		this.picture = pict;
		this.correctPosition = [row, col];
		this.position = [];
	}

	get match() {
		return (this.correctPosition[0] == this.position[0]) && (this.correctPosition[1] == this.position[1]);
	}

	bindStartingPosition() {
		/**
		* Bind piece to a random cell
		*/

		// Select a random cell
		var cell = [randInt(0, this.picture.game.size - 1), randInt(0, this.picture.game.size - 1)];

		// Check if cell is not empty and continue trying until an empty one is found
		while (!this.picture.game.board.cells[cell[0]][cell[1]].empty) {
			cell = [randInt(0, this.picture.game.size - 1), randInt(0, this.picture.game.size - 1)];
		}

		// Mark cell as not empty
		this.picture.game.board.cells[cell[0]][cell[1]].empty = false;

		// Bind position
		this.position = cell;
	}

	move(direction) {
		var startPos = [this.position[0], this.position[1]];

		switch (direction) {
			case 'up':
				this.position[0]+= -1;
				break;
			case 'right':
				this.position[1]+= 1;
				break;
			case 'down':
				this.position[0]+= 1;
				break;
			case 'left':
				this.position[1]+= -1;
				break;
		}

		var endPos = [this.position[0], this.position[1]];

		// Return starting and ending position to be used in updates
		return [startPos, endPos];
	}
}