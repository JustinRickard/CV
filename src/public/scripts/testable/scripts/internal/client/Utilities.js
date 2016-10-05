/// <reference path="User.ts" />
/// <reference path="Job.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="assessment/Assessment.ts" />
/// <reference path="assessment/CaseStudy.ts" />
/// <reference path="assessment/QuestionGroup.ts" />
/// <reference path="assessment/Question.ts" />
/// <reference path="assessment/Option.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="Enums.ts" />
/// <reference path="timeline/TimelineSlide.ts" />
/// <reference path="timeline/TimelineDate.ts" />
/// <reference path="timeline/TimelineEra.ts" />
/// <reference path="timeline/TimelineEvent.ts" />
/// <reference path="timeline/TimelineMedia.ts" />
/// <reference path="timeline/TimelineText.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
var Utilities = (function () {
    function Utilities(errorHandler) {
        this.ErrorHandler = errorHandler;
    }
    // DATA ACCESS METHODS
    Utilities.prototype.Get = function (url) {
        return this.CallServer(HttpVerb.GET, url, null);
    };
    Utilities.prototype.Post = function (url, postData) {
        return this.CallServer(HttpVerb.POST, url, postData);
    };
    Utilities.prototype.CallServer = function (httpVerb, url, postData) {
        var _this = this;
        var verb;
        switch (httpVerb) {
            case HttpVerb.GET:
                $.ajax({
                    url: url,
                    type: 'GET',
                    success: (function (data) {
                        return data;
                    }),
                    error: (function (jq, status, message) {
                        _this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while getting data from the server. Status: " + status + ' - Message: ' + message);
                        return null;
                    }),
                    dataType: 'json'
                });
                break;
            default:
                $.ajax({
                    url: url,
                    type: 'POST',
                    success: (function (data) {
                        return data;
                    }),
                    error: (function (jq, status, message) {
                        _this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while posting data to the server. Status: " + status + ' - Message: ' + message);
                        return null;
                    }),
                    dataType: 'json'
                });
                break;
        }
    };
    // VALIDATION METHODS
    Utilities.prototype.EmailIsValid = function (email) {
        var pattern = /.*@.*[.].*/g;
        var found = email.match(pattern);
        if (!found) {
            return false;
        }
        return true;
    };
    // CREATE METHODS (FROM INTERFACE)
    Utilities.prototype.CreateJob = function (j) {
        return new Job(j.Company, j.Description, j.Start, j.End, j.IsCurrent, j.ImageUrl);
    };
    Utilities.prototype.CreateTimelineSlide = function (j, utils) {
        var timelineText = new TimelineText(j.Company, j.Description);
        var timelineMedia = new TimelineMedia(j.ImageUrl, "");
        return new TimelineSlide(j.Start, j.End, timelineText, timelineMedia, utils);
    };
    Utilities.prototype.CreateTimelineEra = function (e) {
        return new TimelineEra(e.start_date, e.end_date, e.text);
    };
    Utilities.prototype.CreateUser = function (u) {
        return new User(u.ID, u.Username, u.FirstName, u.LastName, u.Email, u.Telephone);
    };
    Utilities.prototype.CreateAssessment = function (a) {
        return new Assessment(a.ID, a.AssessmentType, a.Name, a.CaseStudies, this.ErrorHandler);
    };
    Utilities.prototype.CreateChatPost = function (c, user) {
        return new ChatPost(user, c.Text, c.Time, this.ErrorHandler);
    };
    Utilities.prototype.CreateCaseStudy = function (cs) {
        return new CaseStudy(cs.ID, cs.DisplayOrder, cs.Title, cs.Description, cs.QuestionGroups, this.ErrorHandler);
    };
    Utilities.prototype.CreateQuestionGroup = function (qg) {
        return new QuestionGroup(qg.ID, qg.DisplayOrder, qg.Title, qg.Description, qg.Questions, this.ErrorHandler);
    };
    Utilities.prototype.CreateQuestion = function (q) {
        return new Question(q.ID, q.Text, q.DisplayOrder, q.Options, this.ErrorHandler);
    };
    Utilities.prototype.CreateOption = function (o) {
        return new QuestionOption(o.ID, o.DisplayOrder, o.Text, o.Value, o.IsSelected);
    };
    // Data manipulation
    Utilities.prototype.DateToString = function (date) {
        var day = this.To2Figures(date.getDate().toString());
        var month = this.To2Figures(date.getMonth().toString());
        return date.getFullYear() + "," + month + "," + day;
    };
    Utilities.prototype.To2Figures = function (numberAsString) {
        if (numberAsString.length === 1) {
            numberAsString = "0" + numberAsString;
        }
        return numberAsString;
    };
    Utilities.prototype.GetTimelineDate = function (date) {
        if (!date)
            return null;
        return new TimelineDate(date.getFullYear(), date.getMonth());
    };
    return Utilities;
}());
