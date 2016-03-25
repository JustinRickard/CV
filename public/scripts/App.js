// TODO: Move out to a .html file.
var About_Html = ' \
<div id="about" data-bind="visible: Model.CurrentPage()===2"> \
	<h1 data-bind="text: StaticText.Current.About_Title"></h1>	\
	<p data-bind="text: StaticText.Current.About_Paragraph1"></p>	\
</div> \
';

// TODO: Move out to a .html file.
var Career_Html = ' \
 <div id="career" data-bind="visible: Model.CurrentPage()===3"> \
	<h1 data-bind="text: StaticText.Current.Career_Title"></h1>	\
	<p data-bind="text: StaticText.Current.Career_Paragraph1"></p>	\
</div> \
';

/// <reference path="../scripts/external/DefinitelyTyped/requirejs/require.d.ts" />
var Home_Html = '\
<div id="home" data-bind="visible: Model.CurrentPage()===1">	\
	<h1 data-bind="text: StaticText.Current.Home_Title"></h1>	\
	<p data-bind="text: StaticText.Current.Home_Paragraph1"></p>	\
</div>	\
';

// TODO: Move out to a .html file.
var CSharp_Html = ' \
	<div id= "programming_csharp" data-bind="visible: Model.CurrentPage()===4"> \
	<h1 data-bind="text: StaticText.Current.ProgrammingCSharp_Title"></h1>	\
	<p data-bind="text: StaticText.Current.ProgrammingCSharp_Paragraph1"></p>	\
	</div> \
';

// TODO: Move out to a .html file.
var Typescript_Html = ' \
<div id="programming_typescript" data-bind="visible: Model.CurrentPage()===5"> \
	<h1 data-bind="text: StaticText.Current.ProgrammingTypescript_Title"></h1>	\
	<p data-bind="text: StaticText.Current.ProgrammingTypescript_Paragraph1"></p>	\
</div> \
';

/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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
/// <reference path="API.ts" />
/// <reference path="StubAPI.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="UiText.ts" />
/// <reference path="Router.ts" />
/// <reference path="Enums.ts" />
var _this = this;
var Model;
var StaticText;
var UrlRouter;
$(document).ready(function () {
    var logger = new Logger();
    var errorHandler = new ErrorHandler(_this, logger);
    var utils = new Utilities(errorHandler);
    // Set the API class to use (Live or Stub)
    // var api = new LiveApi(errorHandler, logger);
    var api = new StubApi(errorHandler, logger);
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);
    // Set the model data
    Model = api.GetAllData();
    // Set up the router
    UrlRouter = new Router();
    UrlRouter.Initialise();
});

/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="../../../partials/home.ts" />
/// <reference path="../../../partials/about.ts" />
/// <reference path="../../../partials/career.ts" />
/// <reference path="../../../partials/programming_csharp.ts" />
/// <reference path="../../../partials/programming_typescript.ts" />
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
        this.SetMenuItems();
        this.CurrentPage = ko.observable(Page.Home);
        this.SetPage(Page.Home, true);
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
    AppModel.prototype.SetPage = function (page, pageLoad) {
        var _this = this;
        if (pageLoad === void 0) { pageLoad = false; }
        this.MenuItems.forEach(function (x) {
            _this.SetSelectedMenuItem(x, page);
            if (x.SubItems && x.SubItems.length > 0) {
                x.SubItems.forEach(function (sub) {
                    _this.SetSelectedMenuItem(sub, page);
                });
            }
        });
        this.CurrentPage(page);
        this.InsertTemplate(page);
        if (!pageLoad) {
            var element = document.getElementById("page-content-container");
            ko.cleanNode(element);
            ko.applyBindings(StaticText, document.getElementById("page-content-container"));
        }
    };
    // PRIVATE METHODS
    AppModel.prototype.InsertTemplate = function (page) {
        var container = $("#page-content-container");
        switch (page) {
            case Page.Home:
                container.html(Home_Html);
                break;
            case Page.About:
                container.html(About_Html);
                break;
            case Page.Career:
                container.html(Career_Html);
                break;
            case Page.Programming_CSharp:
                container.html(CSharp_Html);
                break;
            case Page.Programming_Typescript:
                container.html(Typescript_Html);
                break;
        }
    };
    AppModel.prototype.SetSelectedMenuItem = function (menuItem, page) {
        if (menuItem.Page === page) {
            menuItem.Selected(true);
        }
        else {
            menuItem.Selected(false);
        }
    };
    AppModel.prototype.SetMenuItems = function () {
        var menuItems = new Array();
        menuItems.push(new MenuItem(StaticText.Current.Menu_Home, Page.Home, MenuItemLevel.One, null));
        menuItems.push(new MenuItem(StaticText.Current.Menu_About, Page.About, MenuItemLevel.One, null));
        menuItems.push(new MenuItem(StaticText.Current.Menu_Career, Page.Career, MenuItemLevel.One, null));
        var programmingItems = new Array();
        programmingItems.push(new MenuItem(StaticText.Current.Menu_Programming_CSharp, Page.Programming_CSharp, MenuItemLevel.Two, null));
        programmingItems.push(new MenuItem(StaticText.Current.Menu_Programming_Typescript, Page.Programming_Typescript, MenuItemLevel.Two, null));
        menuItems.push(new MenuItem(StaticText.Current.Menu_Programming, null, MenuItemLevel.One, programmingItems));
        this.MenuItems = menuItems;
    };
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

/// <reference path="CaseStudy.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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

/// <reference path="QuestionGroup.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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

var AssessmentType;
(function (AssessmentType) {
    AssessmentType[AssessmentType["SJT"] = 1] = "SJT";
    AssessmentType[AssessmentType["BSQ"] = 2] = "BSQ";
})(AssessmentType || (AssessmentType = {}));
var CultureCode;
(function (CultureCode) {
    CultureCode[CultureCode["en_GB"] = 1] = "en_GB";
    CultureCode[CultureCode["fr_FR"] = 2] = "fr_FR";
    CultureCode[CultureCode["de_DE"] = 3] = "de_DE";
    CultureCode[CultureCode["pt_BR"] = 4] = "pt_BR";
    CultureCode[CultureCode["es_ES"] = 5] = "es_ES";
})(CultureCode || (CultureCode = {}));
var HttpVerb;
(function (HttpVerb) {
    HttpVerb[HttpVerb["GET"] = 1] = "GET";
    HttpVerb[HttpVerb["POST"] = 2] = "POST";
})(HttpVerb || (HttpVerb = {}));
var MenuItemLevel;
(function (MenuItemLevel) {
    MenuItemLevel[MenuItemLevel["One"] = 1] = "One";
    MenuItemLevel[MenuItemLevel["Two"] = 2] = "Two";
})(MenuItemLevel || (MenuItemLevel = {}));
var MessageDisplayStatus;
(function (MessageDisplayStatus) {
    MessageDisplayStatus[MessageDisplayStatus["None"] = 1] = "None";
    MessageDisplayStatus[MessageDisplayStatus["Warning"] = 2] = "Warning";
    MessageDisplayStatus[MessageDisplayStatus["Error"] = 3] = "Error";
})(MessageDisplayStatus || (MessageDisplayStatus = {}));
var Page;
(function (Page) {
    Page[Page["Home"] = 1] = "Home";
    Page[Page["About"] = 2] = "About";
    Page[Page["Career"] = 3] = "Career";
    Page[Page["Programming_CSharp"] = 4] = "Programming_CSharp";
    Page[Page["Programming_Typescript"] = 5] = "Programming_Typescript";
})(Page || (Page = {}));

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

var Job = (function () {
    function Job(company, start, end, isCurrent) {
        this.Company = company;
        this.Start = start;
        this.End = end;
        this.IsCurrent = isCurrent;
    }
    return Job;
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

/// <reference path="UiText.ts" />
/// <reference path="../../external/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />
var StaticText;
$(document).ready(function () {
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);
    ko.applyBindings(StaticText);
});

/// <reference path="Enums.ts" />
/// <reference path="AppModel.ts" />
/// <reference path="Router.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />
var MenuItem = (function () {
    function MenuItem(uiText, page, level, subItems) {
        this.UiText = uiText;
        this.Page = page;
        this.SubItems = subItems;
        this.Level = level;
        this.Selected = ko.observable(false);
        this.Expanded = ko.observable(false);
    }
    MenuItem.prototype.Select = function () {
        if (!this.SubItems || this.SubItems.length === 0) {
            UrlRouter.NavigateTo(this.Page);
        }
        else {
            this.Expanded(!this.Expanded());
        }
    };
    return MenuItem;
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
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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

/// <reference path="../../external/DefinitelyTyped/routie/routie.d.ts" />
// <reference path="AppModel.ts" />
// <reference path="Enums.ts" />
var Router = (function () {
    function Router() {
    }
    Router.prototype.Initialise = function () {
        routie({
            '/': function () {
                Model.SetPage(Page.Home);
            },
            '/about': function () {
                Model.SetPage(Page.About);
            },
            '/career': function () {
                Model.SetPage(Page.Career);
            },
            '/programming_csharp': function () {
                Model.SetPage(Page.Programming_CSharp);
            },
            '/programming_typescript': function () {
                Model.SetPage(Page.Programming_Typescript);
            }
        });
    };
    Router.prototype.NavigateTo = function (page) {
        switch (page) {
            case Page.About:
                routie('/about');
                break;
            case Page.Career:
                routie('/career');
                break;
            case Page.Programming_CSharp:
                routie('/programming_csharp');
                break;
            case Page.Programming_Typescript:
                routie('/programming_typescript');
                break;
            default:
                routie('/');
                break;
        }
    };
    return Router;
})();

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

/// <reference path="Enums.ts" />
/// <reference path="en-GB.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />
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
    UiText.prototype.ReapplyBindings = function () {
        ko.applyBindings(this);
    };
    return UiText;
})();

/// <reference path="Enums.ts" />
/// <reference path="API.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
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
    return Utilities;
})();

/// <reference path="UiText.ts" />
var en_gb = (function () {
    function en_gb() {
        this.Banner_Logo = "JR";
        this.Banner_Slogan1 = "Create";
        this.Banner_Slogan2 = "Improve";
        this.Banner_Slogan3 = "Inspire";
        this.Login_Title = "Login";
        this.Login_Username = "Username";
        this.Login_Password = "Password";
        this.Login_LoginButton = "Log me in!";
        this.Login_Register_Title = "Register";
        this.Login_Register_Button = "Sign me up!";
        this.Login_ForgottenPassword_Button = "Remind me!";
        this.Login_ForgottenPassword_Title = "Forgotten password?";
        this.Tabs_Home = "About me";
        this.Tabs_Jobs = "Jobs";
        this.Tabs_Assessments = "Assessments";
        this.Tabs_LiveChat = "Live Chat";
        this.Tabs_Programming = "Programming";
        this.Home_Title = "Who am I?";
        this.Home_Paragraph1 = "TODO: Home";
        this.About_Title = "About me";
        this.About_Paragraph1 = "TODO: About me";
        this.Career_Title = "My Career";
        this.Career_Paragraph1 = "TODO: Career intro";
        this.ProgrammingCSharp_Title = "C#";
        this.ProgrammingCSharp_Paragraph1 = "TODO: C# intro";
        this.ProgrammingTypescript_Title = "TODO: Typescript";
        this.ProgrammingTypescript_Paragraph1 = "TODO: C# intro";
        this.Assessments_Title = "Assessments";
        this.Assessments_Paragraph1 = "TODO: Assessment intro";
        this.Chat_Title = "Chat live with other members who are logged on!";
        this.Chat_Post = "Post";
        this.Chat_PostHelp = "Type your post here";
        this.Menu_Home = "Home";
        this.Menu_About = "About me";
        this.Menu_Career = "My Career";
        this.Menu_Programming = "Programming";
        this.Menu_Programming_CSharp = "C#";
        this.Menu_Programming_Typescript = "Typescript";
    }
    return en_gb;
})();
