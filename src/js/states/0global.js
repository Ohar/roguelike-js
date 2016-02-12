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
				x1 = - x;
				x2 =   x;
				y1 = - y;
				y2 = - y;
				break;
			case 1:
				x1 =   x;
				x2 =   x;
				y1 = - y;
				y2 =   y;
				break;
			case 2:
				x1 =   x;
				x2 = - x;
				y1 =   y;
				y2 =   y;
				break;
			case 3:
				x1 = - x;
				x2 = - x;
				y1 =   y;
				y2 = - y;
				break;
		}

		return {
			radius: data.look.radius,
			center: {
				x: data.x,
				y: data.y
			},
			startPoint: {
				x: data.x + x1,
				y: data.y + y1
			},
			endPoint: {
				x: data.x + x2,
				y: data.y + y2
			}
		};
	},

	// http://stackoverflow.com/questions/13652518/efficiently-find-points-inside-a-circle-sector
	isPointInsideSector: function (sector, point) {
		var relPoint = getRelPoint(point, sector.center),
			relStart = getRelPoint(sector.startPoint, sector.center),
			relEnd   = getRelPoint(sector.endPoint, sector.center);

		return !areClockwise(relStart, relPoint)
			&& areClockwise(relEnd, relPoint)
			&& isWithinRadius(relPoint, sector.radius);

		function isWithinRadius (v, radius) {
			return Math.pow(v.x, 2) + Math.pow(v.y, 2) <= Math.pow(radius, 2);
		}

		function areClockwise (v1, v2) {
			return v2.x * v1.y > v1.x * v2.y;
		}

		function getRelPoint (p, center) {
			return {
				x: p.x - center.x,
				y: p.y - center.y
			};
		}
	},

	// TODO: make nice tests
	isPointInsideSectorTest: function () {
		var angle = Math.PI / 4;
		var sector = {
			radius: 5,
			center: {
				x: 10,
				y: 10
			},
			startPoint: {
				get x () {
					return  sector.radius * Math.sin(angle) + sector.center.x;
				},
				get y () {
					return  sector.radius * Math.cos(angle) + sector.center.y;
				}
			},
			endPoint: {
				get x () {
					return -sector.radius * Math.sin(angle) + sector.center.x;
				},
				get y () {
					return  sector.radius * Math.cos(angle) + sector.center.y;
				}
			}
		};

		var points = [
			{x:  0 + sector.center.x, y:  6 + sector.center.y, result: false},
			{x:  0 + sector.center.x, y: -6 + sector.center.y, result: false},
			{x:  5 + sector.center.x, y:  1 + sector.center.y, result: false},
			{x:  5 + sector.center.x, y: -1 + sector.center.y, result: false},
			{x:  3 + sector.center.x, y: -2 + sector.center.y, result: false},
			{x:  2 + sector.center.x, y: -3 + sector.center.y, result: false},
			{x:  1 + sector.center.x, y: -4 + sector.center.y, result: false},
			{x: -1 + sector.center.x, y: -4 + sector.center.y, result: false},
			{x:  5 + sector.center.x, y: -0 + sector.center.y, result: false},
			{x:  3 + sector.center.x, y:  2 + sector.center.y, result: false},
			{x:  4 + sector.center.x, y:  1 + sector.center.y, result: false},
			{x: -4 + sector.center.x, y:  1 + sector.center.y, result: false},
			{x:  4 + sector.center.x, y:  4 + sector.center.y, result: false},
			{x: -4 + sector.center.x, y:  4 + sector.center.y, result: false},
			{x:  4 + sector.center.x, y:  3 + sector.center.y, result: false},
			{x: -4 + sector.center.x, y:  3 + sector.center.y, result: false},

			{x:  2 + sector.center.x, y:  3 + sector.center.y, result: true},
			{x:  1 + sector.center.x, y:  1 + sector.center.y, result: true},
			{x: -1 + sector.center.x, y:  1 + sector.center.y, result: true},
			{x:  2 + sector.center.x, y:  2 + sector.center.y, result: true},
			{x: -2 + sector.center.x, y:  2 + sector.center.y, result: true},
			{x:  3 + sector.center.x, y:  3 + sector.center.y, result: true},
			{x: -3 + sector.center.x, y:  3 + sector.center.y, result: true},
			{x:  3 + sector.center.x, y:  4 + sector.center.y, result: true},
			{x: -3 + sector.center.x, y:  4 + sector.center.y, result: true},
			{x: -2 + sector.center.x, y:  3 + sector.center.y, result: true},
			{x:  1 + sector.center.x, y:  4 + sector.center.y, result: true},
			{x: -1 + sector.center.x, y:  4 + sector.center.y, result: true},
			{x:  0 + sector.center.x, y: -0 + sector.center.y, result: true},
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
