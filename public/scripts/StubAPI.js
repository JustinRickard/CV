/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="API.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
// Stub API to return dummy data
var StubApi = (function () {
    function StubApi(errorHandler, logger) {
        this.Utils = new Utilities(errorHandler);
        this.Logger = logger;
        this.ErrorHandler = errorHandler;
    }
    StubApi.prototype.GetAllData = function () {
        var user = this.GenerateUser(1066, "JustinR86", "Justin", "Rickard", "justinr86.jr@gmail.com", "07712334445");
        var users = this.GenerateUsers(4);
        var appModel = new AppModel(this, user, users, this.GenerateJobs(), this.GenerateAssessments(4), this.GenerateChatPosts(users), MessageDisplayStatus.None, "", this.Logger, this.ErrorHandler);
        return appModel;
    };
    StubApi.prototype.Login = function (username, password) {
    };
    StubApi.prototype.Logout = function () {
    };
    // PRIVATE METHODS
    StubApi.prototype.GenerateChatPosts = function (users) {
        // return post data
        var posts = [
            {
                Time: new Date(2014, 9, 17, 9, 0, 0, 0),
                UserID: 0,
                Text: "Post content 4"
            },
            {
                Time: new Date(2008, 8, 4, 9, 0, 0, 0),
                UserID: 1,
                Text: "Post content 1"
            },
            {
                Time: new Date(2012, 9, 20, 9, 0, 0, 0),
                UserID: 2,
                Text: "Post content 2"
            },
            {
                Time: new Date(2013, 6, 1, 9, 0, 0, 0),
                UserID: 3,
                Text: "Post content 3"
            }
        ];
        return posts;
    };
    StubApi.prototype.GenerateUser = function (id, username, firstName, lastName, email, tel) {
        return new User(id, username, firstName, lastName, email, tel);
    };
    StubApi.prototype.GenerateUsers = function (quantity) {
        var users = new Array();
        for (var i = 0; i < quantity; i++) {
            var user = new User(i, "User" + i, "Forename" + i, "Surname" + i, i + "@example.org", "077 " + i + " 998877");
            users.push(user);
        }
        ;
        return users;
    };
    StubApi.prototype.GenerateJobs = function () {
        var jobs = new Array();
        var dates = [
            new Date(2008, 8, 4, 9, 0, 0, 0),
            new Date(2012, 9, 20, 9, 0, 0, 0),
            new Date(2013, 6, 1, 9, 0, 0, 0),
            new Date(2014, 9, 17, 9, 0, 0, 0),
            null
        ];
        for (var i = 0; i < 4; i++) {
            var job = new Job("Job" + i, dates[i], dates[i + 1], false);
            jobs.push(job);
        }
        ;
        return jobs;
    };
    StubApi.prototype.GenerateOptions = function (quantity) {
        var options = new Array();
        for (var i = 0; i < quantity; i++) {
            var option = new QuestionOption(i, i, "Option " + i, i, false);
            options.push(option);
        }
        ;
        return options;
    };
    StubApi.prototype.GenerateQuestions = function (quantity) {
        var questions = new Array();
        for (var i = 0; i < quantity; i++) {
            var question = new Question(i, "Question " + i, i, this.GenerateOptions(quantity), this.ErrorHandler);
            questions.push(question);
        }
        ;
        return questions;
    };
    StubApi.prototype.GenerateQuestionGroups = function (quantity) {
        var groups = new Array();
        for (var i = 0; i < quantity; i++) {
            var group = new QuestionGroup(i, i, "Question Group " + i, "Description for group " + i, this.GenerateQuestions(quantity), this.ErrorHandler);
            groups.push(group);
        }
        ;
        return groups;
    };
    StubApi.prototype.GenerateCaseStudies = function (quantity) {
        var caseStudies = new Array();
        for (var i = 0; i < quantity; i++) {
            var caseStudy = new CaseStudy(i, i, "CaseStudy " + i, "Description for caseStudy " + i, this.GenerateQuestionGroups(quantity), this.ErrorHandler);
            caseStudies.push(caseStudy);
        }
        ;
        return caseStudies;
    };
    StubApi.prototype.GenerateAssessments = function (quantity) {
        var assessments = new Array();
        for (var i = 0; i < quantity; i++) {
            var assessment = new Assessment(i, AssessmentType.SJT, "Assessment " + i, this.GenerateCaseStudies(quantity), this.ErrorHandler);
            assessments.push(assessment);
        }
        ;
        return assessments;
    };
    return StubApi;
})();
