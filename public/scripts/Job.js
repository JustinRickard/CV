var Job = (function () {
    function Job(company, start, end, isCurrent) {
        this.Company = company;
        this.Start = start;
        this.End = end;
        this.IsCurrent = isCurrent;
    }
    return Job;
})();
