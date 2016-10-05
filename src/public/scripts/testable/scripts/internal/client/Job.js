var Job = (function () {
    function Job(company, description, start, end, isCurrent, imageUrl) {
        this.Company = company;
        this.Description = description;
        this.Start = start;
        this.End = end;
        this.IsCurrent = isCurrent;
        this.ImageUrl = imageUrl;
    }
    return Job;
}());
