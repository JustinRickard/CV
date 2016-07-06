var AssessmentType;
(function (AssessmentType) {
    AssessmentType[AssessmentType["SJT"] = 1] = "SJT";
    AssessmentType[AssessmentType["BSQ"] = 2] = "BSQ";
})(AssessmentType || (AssessmentType = {}));
var HttpVerb;
(function (HttpVerb) {
    HttpVerb[HttpVerb["GET"] = 1] = "GET";
    HttpVerb[HttpVerb["POST"] = 2] = "POST";
})(HttpVerb || (HttpVerb = {}));
var MessageDisplayStatus;
(function (MessageDisplayStatus) {
    MessageDisplayStatus[MessageDisplayStatus["None"] = 1] = "None";
    MessageDisplayStatus[MessageDisplayStatus["Warning"] = 2] = "Warning";
    MessageDisplayStatus[MessageDisplayStatus["Error"] = 3] = "Error";
})(MessageDisplayStatus || (MessageDisplayStatus = {}));
var CultureCode;
(function (CultureCode) {
    CultureCode[CultureCode["en_GB"] = 1] = "en_GB";
    CultureCode[CultureCode["fr_FR"] = 2] = "fr_FR";
    CultureCode[CultureCode["de_DE"] = 3] = "de_DE";
    CultureCode[CultureCode["pt_BR"] = 4] = "pt_BR";
    CultureCode[CultureCode["es_ES"] = 5] = "es_ES";
})(CultureCode || (CultureCode = {}));
/// <reference path="Enums.ts" />
/// <reference path="API.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var User = (function () {
    function User(id, username, firstName, lastName, email, telephone) {
        this.ID = id;
        this.Username = username;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Telephone = telephone;
    }
    User.prototype.FullName = function () {
        // TODO: Localise this
        return this.FirstName + " " + this.LastName;
    };
    User.prototype.Logout = function () {
        // Should this just be on the API, not the user?
        localStorage.clear();
    };
    User.prototype.ResetPassword = function (newPassword, confirmNewPassword) {
        // TODO: Reset password
    };
    User.prototype.RequestPasswordReset = function () {
    };
    return User;
})();
var Job = (function () {
    function Job(company, start, end, isCurrent) {
        this.Company = company;
        this.Start = start;
        this.End = end;
        this.IsCurrent = isCurrent;
    }
    return Job;
})();
/// <reference path="Utilities.ts" />
var QuestionOption = (function () {
    function QuestionOption(id, order, text, value, selected) {
        this.ID = id;
        this.DisplayOrder = order;
        this.Text = text;
        this.Value = value;
        this.IsSelected = selected;
    }
    return QuestionOption;
})();
/// <reference path="Option.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var Question = (function () {
    function Question(id, text, order, options, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.Text = text;
        this.DisplayOrder = order;
        this.Options = new Array();
        options.forEach(function (x) { _this.Options.push(utils.CreateOption(x)); });
    }
    Question.prototype.SelectOption = function (optionId) {
        // Set all options as unselected
        this.Options.forEach(function (x) { x.IsSelected = false; });
        // Set the chosen option as selected
        var option = _.find(this.Options, function (x) { x.ID === optionId; });
        if (option) {
            option.IsSelected = true;
        }
        else {
            console.log("Error: Option with ID " + optionId + " was selected, but this does not exist.");
        }
    };
    return Question;
})();
/// <reference path="Question.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var QuestionGroup = (function () {
    function QuestionGroup(id, order, title, description, questions, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.DisplayOrder = order;
        this.Title = title;
        this.Description = description;
        // Create Questions array
        this.Questions = new Array();
        questions.forEach(function (x) { return _this.Questions.push(utils.CreateQuestion(x)); });
        this.SortQuestions();
        if (this.Questions.length > 0) {
            this.CurrentQuestionIndex = 0;
            this.SetCurrentQuestion();
        }
    }
    QuestionGroup.prototype.SortQuestions = function () {
        this.Questions = _.orderBy(this.Questions, ['DisplayOrder'], ['asc']);
    };
    QuestionGroup.prototype.PreviousQuestion = function () {
        if (this.CurrentQuestionIndex > 0) {
            this.CurrentQuestionIndex--;
            this.SetCurrentQuestion();
        }
    };
    QuestionGroup.prototype.NextQuestion = function () {
        if (this.CurrentQuestionIndex < this.Questions.length - 1) {
            this.CurrentQuestionIndex++;
            this.SetCurrentQuestion;
        }
    };
    // PRIVATE METHODS
    QuestionGroup.prototype.SetCurrentQuestion = function () {
        this.CurrentQuestion = this.Questions[this.CurrentQuestionIndex];
    };
    return QuestionGroup;
})();
/// <reference path="QuestionGroup.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var CaseStudy = (function () {
    function CaseStudy(id, displayOrder, title, description, questionGroups, errorHandler) {
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.DisplayOrder = displayOrder;
        this.Title = title;
        this.Description = description;
        this.QuestionGroups = new Array();
        for (var i = 0; i < questionGroups.length; i++) {
            var qg = questionGroups[i];
            this.QuestionGroups.push(utils.CreateQuestionGroup(qg));
        }
        this.SortQuestionGroups();
        if (this.QuestionGroups.length > 0) {
            this.CurrentQuestionGroupIndex = 0;
            this.SetCurrentQuestionGroup();
        }
    }
    CaseStudy.prototype.SortQuestionGroups = function () {
        this.QuestionGroups = _.orderBy(this.QuestionGroups, ['DisplayOrder'], ['asc']);
    };
    CaseStudy.prototype.PreviousQuestionGroup = function () {
        if (this.CurrentQuestionGroupIndex > 0) {
            this.CurrentQuestionGroupIndex--;
            this.SetCurrentQuestionGroup();
        }
    };
    CaseStudy.prototype.NextQuestionGroup = function () {
        if (this.CurrentQuestionGroupIndex < this.QuestionGroups.length - 1) {
            this.CurrentQuestionGroupIndex++;
            this.SetCurrentQuestionGroup();
        }
    };
    // PRIVATE METHODS
    CaseStudy.prototype.SetCurrentQuestionGroup = function () {
        this.CurrentQuestionGroup = this.QuestionGroups[this.CurrentQuestionGroupIndex];
    };
    return CaseStudy;
})();
/// <reference path="CaseStudy.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var Assessment = (function () {
    function Assessment(id, assessmentType, name, caseStudies, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.AssessmentType = assessmentType;
        this.Name = name;
        this.CaseStudies = new Array();
        caseStudies.forEach(function (x) { _this.CaseStudies.push(utils.CreateCaseStudy(x)); });
        this.SortCaseStudies();
        if (this.CaseStudies.length > 0) {
            this.CurrentCaseStudyIndex = 0;
            this.SetCurrentCaseStudy();
        }
        this.InProgress = false;
        this.Submitting = false;
    }
    Assessment.prototype.SortCaseStudies = function () {
        this.CaseStudies = _.orderBy(this.CaseStudies, ['DisplayOrder'], ['asc']);
    };
    Assessment.prototype.PreviousCaseStudy = function () {
        if (this.CurrentCaseStudyIndex > 0) {
            this.CurrentCaseStudyIndex--;
            this.SetCurrentCaseStudy();
        }
    };
    Assessment.prototype.NextCaseStudy = function () {
        if (this.CurrentCaseStudyIndex < this.CaseStudies.length - 1) {
            this.CurrentCaseStudyIndex++;
            this.SetCurrentCaseStudy();
        }
    };
    Assessment.prototype.Start = function () {
        this.InProgress = true;
    };
    Assessment.prototype.Submit = function () {
        this.InProgress = false;
        this.Submitting = true;
    };
    Assessment.prototype.Previous = function () {
        var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;
        if (currentQuestionIndex > 0) {
            // The user is not on the first question of the group
            this.CurrentCaseStudy.CurrentQuestionGroup.PreviousQuestion();
        }
        else {
            // The user is on the first question of the group
            var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
            if (currentQuestionGroupIndex > 0) {
                // The user is not on the first question group
                this.CurrentCaseStudy.PreviousQuestionGroup();
            }
            else {
                // The user is not on the last question group of the case study
                var currentCaseStudyIndex = this.CurrentCaseStudyIndex;
                if (currentCaseStudyIndex > 0) {
                    // The user is not on the last case study
                    this.PreviousCaseStudy();
                }
                else {
                }
            }
        }
    };
    Assessment.prototype.Next = function () {
        var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;
        var currentQuestionGroupLength = this.CurrentCaseStudy.CurrentQuestionGroup.Questions.length;
        if (currentQuestionIndex < currentQuestionGroupLength - 1) {
            // The user is not on the last question of the group
            this.CurrentCaseStudy.CurrentQuestionGroup.NextQuestion();
        }
        else {
            // The user is on the last question of the group (and the last question)
            var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
            var currentCaseStudyLength = this.CurrentCaseStudy.QuestionGroups.length;
            if (currentQuestionGroupIndex < currentCaseStudyLength - 1) {
                // The user is not on the last question group in the case study (and is on the last question)
                this.CurrentCaseStudy.NextQuestionGroup();
            }
            else {
                // The user is on the last question group in the case study (and is on the last question)
                var currentCaseStudyIndex = this.CurrentCaseStudyIndex;
                var currentAssessmentLength = this.CaseStudies.length;
                if (currentCaseStudyIndex < currentAssessmentLength - 1) {
                    this.NextCaseStudy();
                }
                else {
                    // The user is on the last case study (and the last question, and last question group)
                    this.Submit();
                }
            }
        }
    };
    // PRIVATE METHODS
    Assessment.prototype.SetCurrentCaseStudy = function () {
        this.CurrentCaseStudy = this.CaseStudies[this.CurrentCaseStudyIndex];
    };
    return Assessment;
})();
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.Error = function (message) {
        console.log("Error: " + message);
    };
    Logger.prototype.Warning = function (message) {
        console.log("Warning: " + message);
    };
    return Logger;
})();
/// <reference path="Logger.ts" />
/// <reference path="AppModel.ts" />
var ErrorHandler = (function () {
    function ErrorHandler(appModel, logger) {
        this.AppModel = appModel;
        this.Logger = logger;
    }
    ErrorHandler.prototype.Handle = function (messageStatus, message) {
        // Display error message
        this.AppModel.SetMessage(messageStatus, message);
        // Log message
        switch (messageStatus) {
            case MessageDisplayStatus.Error:
                this.Logger.Error(message);
                break;
            case MessageDisplayStatus.Warning:
                this.Logger.Warning(message);
                break;
        }
    };
    ErrorHandler.prototype.Clear = function () {
        this.AppModel.ClearMessage();
    };
    return ErrorHandler;
})();
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
/// <reference path="../External/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
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
/// <reference path="User.ts" />
/// <reference path="Utilities.ts" />
var ChatPost = (function () {
    function ChatPost(user, text, time, errorHandler) {
        var utils = new Utilities(errorHandler);
        this.User = utils.CreateUser(user);
        this.Text = text;
        this.Time = time;
    }
    return ChatPost;
})();
/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
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
/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
var LiveApi = (function () {
    function LiveApi(errorHandler, logger) {
        this.Utils = new Utilities(errorHandler);
        this.Logger = logger;
        this.ErrorHandler = errorHandler;
    }
    LiveApi.prototype.GetAllData = function () {
        var data = this.Utils.Get("GetAll");
        if (data) {
            var appModel = new AppModel(this, data.User, data.Users, data.Jobs, data.Assessments, data.ChatPosts, data.MessageStatus, data.CurrentMessage, this.Logger, this.ErrorHandler);
            return appModel;
        }
        return null;
    };
    LiveApi.prototype.Login = function (username, password) {
    };
    LiveApi.prototype.Logout = function () {
    };
    return LiveApi;
})();
/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="API.ts" />
/// <reference path="../External/DefinitelyTyped/lodash/lodash.d.ts" />
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
/// <reference path="UiText.ts" />
var en_gb = (function () {
    function en_gb() {
        this.Login_Welcome = "Sign in or sign up below to enter to enter my site.";
        this.Login_Username = "Username";
        this.Login_Password = "Password";
        this.Login_LoginButton = "Login";
        this.Login_SignUp = "Sign me up!";
        this.Login_ForgottenPassword = "Forgotten password";
        this.Tabs_Home = "About me";
        this.Tabs_Jobs = "Jobs";
        this.Tabs_Assessments = "Assessments";
        this.Tabs_LiveChat = "Live Chat";
        this.Tabs_Programming = "Programming";
        this.Home_Welcome = "Who am I?";
        this.Home_Paragraph1 = "TODO: About me";
        this.Jobs_Welcome = "My Career";
        this.Jobs_Paragraph1 = "TODO: Career intro";
        this.Assessments_Welcome = "Assessments";
        this.Assessments_Paragraph1 = "TODO: Assessment intro";
        this.Chat_Welcome = "Chat live with other members who are logged on!";
        this.Chat_Post = "Post";
        this.Chat_PostHelp = "Type your post here";
    }
    return en_gb;
})();
/// <reference path="Enums.ts" />
/// <reference path="en-GB.ts" />
var UiText = (function () {
    // Other languages here
    function UiText(cultureCode) {
        // Define languages
        this.enGB = new en_gb();
        // Set current language
        this.SelectLanguage(cultureCode);
    }
    UiText.prototype.SelectLanguage = function (cultureCode) {
        switch (cultureCode) {
            case CultureCode.en_GB:
                this.Current = this.enGB;
                break;
            case CultureCode.fr_FR:
                break;
            case CultureCode.de_DE:
                break;
            case CultureCode.pt_BR:
                break;
            case CultureCode.es_ES:
                break;
        }
    };
    return UiText;
})();
/// <reference path="AppModel.ts" />
/// <reference path="API.ts" />
/// <reference path="StubAPI.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="UiText.ts" />
/// <reference path="Enums.ts" />
var _this = this;
var Model;
var StaticText;
$(document).ready(function () {
    var logger = new Logger();
    var errorHandler = new ErrorHandler(_this, logger);
    var utils = new Utilities(errorHandler);
    // Set the API class to use (Live or Stub)
    // var api = new LiveApi(errorHandler, logger);
    var api = new StubApi(errorHandler, logger);
    // Set the model data
    Model = api.GetAllData();
    // Set static text
    StaticText = new UiText(Model.CultureCode);
});
/// <reference path="AppModel.ts" />
/// <reference path="API.ts" />
/// <reference path="StubAPI.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="UiText.ts" />
/// <reference path="Enums.ts" />
var _this = this;
var StaticText;
$(document).ready(function () {
    var logger = new Logger();
    var errorHandler = new ErrorHandler(_this, logger);
    var utils = new Utilities(errorHandler);
    // Set the API class to use (Live or Stub)
    // var api = new LiveApi(errorHandler, logger);
    var api = new StubApi(errorHandler, logger);
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);
});
