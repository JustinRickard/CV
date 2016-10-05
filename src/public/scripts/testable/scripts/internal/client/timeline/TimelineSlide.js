/// <reference path="TimelineDate.ts" />
/// <reference path="TimelineText.ts" />
/// <reference path="TimelineMedia.ts" />
var TimelineSlide = (function () {
    function TimelineSlide(start_date, end_date, text, media, utils) {
        this.start_date = utils.GetTimelineDate(start_date);
        this.end_date = utils.GetTimelineDate(end_date);
        this.text = text;
        this.media = media;
    }
    return TimelineSlide;
}());
