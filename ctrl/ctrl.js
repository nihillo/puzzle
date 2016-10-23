class CtrlSelector {
	constructor() {
		this.view = new ViewSelector();
		this.bindBtnEvents();
	}
	
	bindBtnEvents() {
		for (let s = 3; s < 7; s++) {
			document.getElementById('btn-' + s).addEventListener('click', function() {
				location.hash = '#game/' + s;
				location.reload();
			});
		}
	}
}

class CtrlGame {
	constructor(size) {
		this.size = size;

		this.view = new ViewGame();
		this. app = new Puzzle(this.size);
		
		this.view.draw(this.size, this.pieceMap);

		var self = this;
		window.addEventListener('keydown', function(event) {

			switch(event.key) {
				case 'ArrowUp':
					self.move('up');
					break;
				case 'ArrowRight':
					self.move('right');
					break;
				case 'ArrowDown':
					self.move('down');
					break;
				case 'ArrowLeft':
					self.move('left');
					break;
			}
		});

		// console.log(this.app.picture.map);
	}

	get pieceMap() {
		return this.app.picture.map;
	}

	move(direction) {
		
		// Move piece in app and get movable piece in order to use it in view
		var movement = this.app.move(direction);

		// Redraw pieces
		this.view.drawPic(this.size, this.pieceMap);

		// Update movements
		this.view.messages('movements', this.app.movements);

		// Show message if complete
		if (this.app.checkFinished()) {
			this.view.messages('complete');
			this.view.messages('time-used', toMinutesSeconds(this.app.timeUsed));
		}
	}
}