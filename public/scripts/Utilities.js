/// <reference path="User.ts" />
/// <reference path="Job.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="CaseStudy.ts" />
/// <reference path="QuestionGroup.ts" />
/// <reference path="Question.ts" />
/// <reference path="Option.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="Enums.ts" />
/// <reference path="../../external/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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
        return new Job(j.Company, j.Start, j.End, j.IsCurrent);
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
    return Utilities;
})();
