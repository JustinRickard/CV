/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
var AppModel = (function () {
    function AppModel(api, user, users, jobs, assessments, chatPosts, messageStatus, currentMessage, logger, errorHandler) {
        var utils = new Utilities(errorHandler);
        this.Api = api;
        this.User = utils.CreateUser(user);
        this.SetJobs(jobs, utils);
        this.SetUsers(users, utils);
        this.SetAssessments(assessments, utils);
        this.SetChatPosts(chatPosts, utils);
        this.MessageStatus = messageStatus;
        this.CurrentMessage = currentMessage;
    }
    // PUBLIC METHODS
    AppModel.prototype.StartAssessment = function (assessmentId) {
        // Ensure no other assessments are in progress.
        this.Assessments.forEach(function (x) { x.InProgress = false; });
        // Flag the selected assessment as in progress
        var selectedAssessment = _.find(this.Assessments, function (x) { x.ID === assessmentId; });
        selectedAssessment.InProgress = true;
    };
    AppModel.prototype.SetMessage = function (messageStatus, message) {
        this.CurrentMessage = message;
        this.MessageStatus = messageStatus;
    };
    AppModel.prototype.ClearMessage = function () {
        this.CurrentMessage = "";
        this.MessageStatus = MessageDisplayStatus.None;
    };
    // PRIVATE METHODS
    AppModel.prototype.SortAssessments = function () {
        this.Assessments = _.orderBy(this.Assessments, ['Name'], ['asc']);
    };
    AppModel.prototype.SortChatPosts = function () {
        this.ChatPosts = _.orderBy(this.ChatPosts, ['Time'], ['asc']);
    };
    AppModel.prototype.SortJobs = function () {
        this.Jobs = _.orderBy(this.Jobs, ['Start'], ['asc']);
    };
    AppModel.prototype.SetUsers = function (users, utils) {
        var _this = this;
        this.Users = new Array();
        users.forEach(function (x) { _this.Users.push(utils.CreateUser(x)); });
    };
    AppModel.prototype.SetAssessments = function (assessments, utils) {
        var _this = this;
        this.Assessments = new Array();
        assessments.forEach(function (x) { _this.Assessments.push(utils.CreateAssessment(x)); });
        this.SortAssessments();
    };
    AppModel.prototype.SetChatPosts = function (chatPosts, utils) {
        var _this = this;
        this.ChatPosts = new Array();
        chatPosts.forEach(function (post) {
            var user = _.find(_this.Users, function (u) { return u.ID === post.UserID; });
            _this.ChatPosts.push(utils.CreateChatPost(post, user));
        });
        this.SortChatPosts();
    };
    AppModel.prototype.SetJobs = function (jobs, utils) {
        var _this = this;
        this.Jobs = new Array();
        jobs.forEach(function (x) { return _this.Jobs.push(utils.CreateJob(x)); });
        this.SortJobs();
    };
    return AppModel;
})();
