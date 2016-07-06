interface TimelineDate {
	year: number;
	month: number
}

class TimelineDate {
	constructor (
		year: number,
		month: number
	) {
		this.year = year;
		this.month = month + 1;  // Javascript dates are 0-indexed. 0 = January, 1 = February
	}
}