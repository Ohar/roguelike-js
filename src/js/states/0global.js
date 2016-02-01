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

		console.info(InsideSector(1, 1, 5, 1, 1, 5, 3, 3)); // test1, yes Inside
		console.info(InsideSector(1, 1, 5, 1, 7, 2, 3, 3)); // test2, no  Intersection

		function sign (r) {
			if (r = 0) {
				return 0;
			} else if (r < 0) {
				return -1;
			} else {
				return 1;
			}
		}

		function InsideSector (tx, ty, x1, y1, x2, y2, px, py) {
			var x = (tx + x1 + x2) / 3,
				y = (ty + y1 + y2) / 3,
				a1 = ty - y1,
				a2 = ty - y2,
				b1 = x1 - tx,
				b2 = x2 - tx,
				c1 = tx * y1 - ty * x1,
				c2 = tx * y2 - ty * x2,
				i1 = sign(a1 * x + b1 * y + c1),
				i2 = sign(a2 * x + b2 * y + b2),
				i3 = sign(a1 * px + b1 * py + c1),
				i4 = sign(a2 * px + b2 * py + c2);

			return Boolean(
				   ((i1 === i3) && (i2 === i4))
				|| ((i1 === 0) && (i2 === i4))
				|| ((i1 === i3) && (i2 === 0))
			);
		}
	}
};
