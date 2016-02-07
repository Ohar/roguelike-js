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

	getSector: function (data) {

		var x1, x2, y1, y2,
			startAngle = data.look.direction * Math.PI / 2,
			b = startAngle + (data.look.angle / 2),
			A = data.look.radius,
			x = Math.abs(A * Math.sin(b)),
			y = Math.abs(A * Math.cos(b));

		switch (data.look.direction) {
			case 0:
				x1 = data.x - x;
				x2 = data.x + x;
				y1 = -y;
				y2 = -y;
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
				x1 = -x;
				x2 = -x;
				y1 = data.y + y;
				y2 = data.y - y;
				break;
		}

		return {
			radius: data.look.radius,
			center: {
				x: data.x,
				y: data.y
			},
			startPoint: {
				x: x1,
				y: y1
			},
			endPoint: {
				x: x2,
				y: y2
			}
		};
	},

	// http://stackoverflow.com/questions/13652518/efficiently-find-points-inside-a-circle-sector
	isPointInsideSector: function (sector, point) {
		var relPoint = {
			x: point.x - sector.center.x,
			y: point.y - sector.center.y
		};

		return !areClockwise(sector.startPoint, relPoint)
			&& areClockwise(sector.endPoint, relPoint)
			&& isWithinRadius(relPoint, sector.radius);

		function isWithinRadius (v, radius) {
			return v.x * v.x + v.y * v.y <= Math.pow(radius, 2);
		}

		function areClockwise (v1, v2) {
			return -v1.x * v2.y + v1.y * v2.x > 0;
		}
	},

	// TODO: make nice tests
	isPointInsideSectorTest: function () {
		var sector = {
			radius: 5,
			center: {
				x: 0,
				y: 0
			},
			startPoint: {
				x: -5 * Math.sin(Math.PI / 4),
				y: -5 * Math.sin(Math.PI / 4)
			},
			endPoint: {
				x: +5 * Math.sin(Math.PI / 4),
				y: -5 * Math.sin(Math.PI / 4)
			}
		};

		var points = [
			{
				x: 5,
				y: -1,
				result: false,
			},
			{
				x: 5,
				y: 1,
				result: false,
			},
			{
				x: 3,
				y: 2,
				result: false,
			},
			{
				x: 2,
				y: 3,
				result: false,
			},
			{
				x: 1,
				y: 4,
				result: false,
			},
			{
				x: -1,
				y: 4,
				result: false,
			},
			{
				x: 5,
				y: 0,
				result: false,
			},
			{
				x: 3,
				y: -2,
				result: false,
			},
			{
				x: 4,
				y: -1,
				result: false,
			},
			{
				x: -4,
				y: -1,
				result: false,
			},
			{
				x: 4,
				y: -4,
				result: false,
			},
			{
				x: -4,
				y: -4,
				result: false,
			},
			{
				x: 4,
				y: -3,
				result: false,
			},
			{
				x: -4,
				y: -3,
				result: false,
			},

			{
				x: 2,
				y: -3,
				result: true,
			},
			{
				x: 1,
				y: -1,
				result: true,
			},
			{
				x: -1,
				y: -1,
				result: true,
			},
			{
				x: 2,
				y: -2,
				result: true,
			},
			{
				x: -2,
				y: -2,
				result: true,
			},
			{
				x: 3,
				y: -3,
				result: true,
			},
			{
				x: -3,
				y: -3,
				result: true,
			},
			{
				x: 3,
				y: -4,
				result: true,
			},
			{
				x: -3,
				y: -4,
				result: true,
			},
			{
				x: -2,
				y: -3,
				result: true,
			},
			{
				x: 1,
				y: -4,
				result: true,
			},
			{
				x: -1,
				y: -4,
				result: true,
			},
			{
				x: 0,
				y: 0,
				result: true,
			},
		];

		points.forEach(function (e) {
			var result = GameCtrl.isPointInsideSector(sector, e),
			okay = e.result === result;

			if (!okay) {
				console.log(e, result);
			}
		});
	}
};
