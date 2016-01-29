'use strict';

var GameCtrl = {
	// any global stuff you want

	random: function (max) {
		return Math.floor(Math.random() * max);
	},

	countDistance: function (A, B) {
		var dX = Math.abs(A.x - B.x),
			dY = Math.abs(A.y - B.y),
			distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

		return distance;
	},

	// TODO: get sector sides
	getSector: function (data) {

		var x1, x2, y1, y2,
			startAngle = data.look.direction * Math.PI / 2,
			b = startAngle / 2,
			A = data.look.range,
			x = A * Math.sin(b),
			y = A * Math.cos(b);

		switch (data.look.direction) {
			case 0:
				x1 = data.x - x;
				x2 = data.x + x;
				y1 = y;
				y2 = y;
				break;
			case 1:
				x1 = x;
				x2 = x;
				y1 = data.y - y;
				y2 = data.y + y;
				break;
			case 2:
				x1 = data.x + x;
				x2 = data.x - x;
				y1 = y;
				y2 = y;
				break;
			case 3:
				x1 = x;
				x2 = x;
				y1 = data.y + y;
				y2 = data.y - y;
				break;
		}

		return {
			tX: data.x,
			tY: data.y,
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
		};
	},

	// http://acmp.ru/article.asp?id_text=171
	checkPointInsideSector: function (sector, point) {
		return true;
	}
};
