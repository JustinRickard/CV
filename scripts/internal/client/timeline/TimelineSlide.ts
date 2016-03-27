/// <reference path="TimelineDate.ts" />
/// <reference path="TimelineText.ts" />
/// <reference path="TimelineMedia.ts" />

interface ITimelineSlide {
	start_date: TimelineDate;
	end_date: TimelineDate
	text: TimelineText;
	media: TimelineMedia;
}

class TimelineSlide implements ITimelineSlide {

	start_date: TimelineDate;
	end_date: TimelineDate
	text: TimelineText;
	media: TimelineMedia;

	constructor(
		start_date: Date,
		end_date: Date,
		text: TimelineText,
		media: TimelineMedia,
		utils: Utilities
	) {
		this.start_date = utils.GetTimelineDate(start_date);
		this.end_date = utils.GetTimelineDate(end_date);
		this.text = text;
		this.media = media;
	}

	


}