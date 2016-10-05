/// <reference path="Asset.ts" />
/// <reference path="../Utilities.ts" />
var TimelineEvent = (function () {
    function TimelineEvent(startDate, endDate, headline, text, tag, classname, asset) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.headline = headline;
        this.text = text;
        this.tag = tag;
        this.classname = classname;
        this.asset = asset;
    }
    return TimelineEvent;
}());
