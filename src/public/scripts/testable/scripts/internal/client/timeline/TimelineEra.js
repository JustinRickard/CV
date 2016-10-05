// <reference path="../Utilities.ts" />
/// <reference path="TimelineText.ts" />
/// <reference path="TimelineDate.ts" />
var TimelineEra = (function () {
    function TimelineEra(startDate, endDate, text) {
        this.start_date = startDate;
        this.end_date = endDate;
        this.text = text;
    }
    TimelineEra.prototype.DateToString = function (date) {
        var day = this.To2Figures(date.getDate().toString());
        var month = this.To2Figures(date.getMonth().toString());
        return date.getFullYear() + "," + month + "," + day;
    };
    TimelineEra.prototype.To2Figures = function (numberAsString) {
        if (numberAsString.length === 1) {
            numberAsString = "0" + numberAsString;
        }
        return numberAsString;
    };
    return TimelineEra;
}());
