var TimelineDate = (function () {
    function TimelineDate(year, month) {
        this.year = year;
        this.month = month + 1; // Javascript dates are 0-indexed. 0 = January, 1 = February
    }
    return TimelineDate;
}());
