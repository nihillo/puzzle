window.onload = function() {
	var route;

	if (location.hash) {
		route = location.hash.split('/');

		switch (route[0]) {
			case '#game':
				controller = new CtrlGame(route[1]);
				break;
			case '#select':
				controller = new CtrlSelector();
				break;
			default:
				controller = new CtrlSelector();
		}

	} else {

		controller = new CtrlSelector();

	}
	
	
};