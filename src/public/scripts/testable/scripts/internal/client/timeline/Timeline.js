// For JSON information on Timeline.js: http://timeline.knightlab.com/docs/json-format.html
/// <reference path="TimelineSlide.ts" />
/// <reference path="TimelineEra.ts" />
var Timeline = (function () {
    function Timeline(events, eras) {
        this.events = events;
        this.eras = eras;
    }
    return Timeline;
}());
