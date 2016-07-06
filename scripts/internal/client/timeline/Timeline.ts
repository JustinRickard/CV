// For JSON information on Timeline.js: http://timeline.knightlab.com/docs/json-format.html

/// <reference path="TimelineSlide.ts" />
/// <reference path="TimelineEra.ts" />

interface ITimeline {
	events: TimelineSlide[];
	eras: TimelineEra[];
}

class Timeline implements ITimeline {
	events: TimelineSlide[];
	eras: TimelineEra[];

	constructor (
		events: TimelineSlide[],
		eras: TimelineEra[]
	) {
		this.events = events;
		this.eras = eras;
	}


}