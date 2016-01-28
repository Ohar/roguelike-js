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

		return {
			tX: data.x,
			tY: data.y,
			x1: null,
			y1: null,
			x2: null,
			y2: null,
		};
	},

	// http://acmp.ru/article.asp?id_text=171
	checkPointInsideSector: function (sector, point) {
		return true;
	}
};
