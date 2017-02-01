/*
type:
	- normal
	- wall
	- points

north = 0
east = 1
south = 2
left = 3
*/

export default class Node {
	constructor(type = 'normal', static_points = 0, north = 0, east = 0, south = 0, west = 0) {
		this.type = type;
		this.static_points = static_points;
		this.points = [north, east, south, west];
		// this.north = north;
		// this.east = east;
		// this.south = south;
		// this.west = west;
	}

	getHighestAction() {
		let same_highest = [];
		let tmp_highest = this.points[0];

		// find the direction with the highest point
		let i = 0;
		for (i = 0; i < this.points.length; i++) {
			if (this.points[i] > tmp_highest) {
				tmp_highest = this.points[i];
				same_highest = [i];
			} else if (this.points[i] === tmp_highest) {
				same_highest.push(i);
			}
		}

		i = 0;
		// if multiple highest, grab a random index from them
		if(same_highest.length > 1) {
			i = Math.floor(Math.random() * same_highest.length);
		}

		return same_highest[i];
	}

	max() {
		if (this.type === 'normal') {
			return Math.max(...this.points);
		}

		return this.static_points;
	}

	setDirectionPoints(direction_index, points) {
		// points = Math.round(points * 100) / 100;
		if (this.type === 'normal') {
			console.log('set normal', direction_index, points);
			this.points[direction_index] = points;
			console.log('current points: ', this.points);
		} else if (this.type === 'points') {
			console.log('set points', direction_index, points);
			console.log('updating point type to: ', points);
			this.static_points = points;
		}
	}
}
