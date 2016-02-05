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
			startAngle = Math.PI + data.look.direction * Math.PI / 2,
			b = startAngle + (data.look.angle / 2),
			A = data.look.radius,
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
	}
};
