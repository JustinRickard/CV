interface ITimelineMedia {
	url: string;
	caption: string;
}

class TimelineMedia implements ITimelineMedia {

	url: string;
	caption: string;

	constructor (
		url: string,
		caption: string
	) {
		this.url = url;
		this.caption = caption;
	}
}