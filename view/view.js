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


	messages(code) {
		var message;

		switch (code) {
			case 'complete':
				message = 'Wonderful!';
				break;
		}		

		this.msg.innerHTML = message;
	}
}