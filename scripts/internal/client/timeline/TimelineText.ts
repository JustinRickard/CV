interface ITimelineText {
	headline: string;
	text: string;
}

class TimelineText implements ITimelineText {
	headline: string;
	text: string;

	constructor (
		headline: string,
		text: string
	) {
		this.headline = headline;
		this.text = text;
	}
}