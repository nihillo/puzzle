class View {
	
	constructor () {
		this.content = document.getElementById('content');
	}

}




class ViewSelector extends View {
	
	constructor() {
		super();
		this.content.innerHTML = `
			<div class="selector">
				<p>Select size</p>
				<div class="btn-container">
					<button id="btn-3">3</button>
					<button id="btn-4">4</button>
					<button id="btn-5">5</button>
					<button id="btn-6">6</button>
				</div>
			</div>
		`;
	}

}




class ViewGame extends View {
	
	constructor(_size) {
		super();

		this.picture = document.createElement('div');
			this.picture.className = 'picture';
			this.content.appendChild(this.picture);

		this.info = document.createElement('div');
			this.info.className = 'info';
			this.content.appendChild(this.info);

		this.mvmts = document.createElement('span');
			this.mvmts.className = 'movements';
			this.info.appendChild(this.mvmts);

		this.timer = document.createElement('span');
			this.timer.className = 'timer';
			this.info.appendChild(this.timer); 
			createTimer(this.timer);

		this.timeUsed = document.createElement('span');
			this.timeUsed.className = 'timer';

		this.msg = document.createElement('div');
			this.msg.className = 'messages';
			this.content.appendChild(this.msg);

	}
	
	
	drawPic(size, pieceMap) {

		// Clean picture
		this.picture.innerHTML = '';

		// Build picture
		for (let row = 0; row < size; row++) {

			var newRow = document.createElement('div');
			newRow.className = 'row';

			this.picture.appendChild(newRow);

			for (let col = 0; col < size; col++) {
				var newPiece = document.createElement('div');
				newPiece.className = 'piece';
				newPiece.setAttribute('data-row', row);
				newPiece.setAttribute('data-col', col);

				/*TEST-------------------*/
				// Render numbers in pieces
				var str = '';
				if (pieceMap[`${row}-${col}`]) {
					// str = pieceMap[`${row}-${col}`].split('-')[0];
					str = parseInt(pieceMap[`${row}-${col}`].split('-')[0])*size + parseInt(pieceMap[`${row}-${col}`].split('-')[1]) + 1;
		 		} 
				var content = document.createTextNode(str);
				
				/*------------------------*/

				newPiece.appendChild(content);
				newRow.appendChild(newPiece);
			}
		}
	}

	
	draw(size, pieceMap) {
		this.drawPic(size, pieceMap);
	}

	
	messages(code, ...args) {
		var message, movements, time;

		switch (code) {
			case 'complete':
				message = `
					<div>Wonderful!</div>
					<div><button id="replay">Play again</button></div>
				`;
				this.msg.innerHTML = message;

				document.getElementById('replay').addEventListener('click', function(){
					location.hash = '';
					location.reload();
				});
				break;
			case 'movements':
				movements = 'Mv: ' + args[0]; 
				this.mvmts.innerHTML = movements;
				break;
			case 'time-used':
				time = 'T: ' + args[0];
				this.info.removeChild(this.timer);
				this.info.appendChild(this.timeUsed); 
				this.timeUsed.innerHTML = time;
				break;
		}
	}	
}