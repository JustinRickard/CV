/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="assessment/Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="helpers/MenuHelper.ts" />
/// <reference path="timeline/Timeline.ts" />
/// <reference path="timeline/TimelineSlide.ts" />
/// <reference path="timeline/TimelineEra.ts" />
/// <reference path="../../../partials/generated/home.ts" />
/// <reference path="../../../partials/generated/about.ts" />
/// <reference path="../../../partials/generated/career.ts" />
/// <reference path="../../../partials/generated/programming_csharp.ts" />
/// <reference path="../../../partials/generated/programming_typescript.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/timelinejs/timelinejs.d.ts" />
var AppModel = (function () {
    function AppModel(api, user, users, jobs, eras, assessments, chatPosts, messageStatus, currentMessage, logger, errorHandler) {
        var utils = new Utilities(errorHandler);
        this.Api = api;
        this.ErrorHandler = errorHandler;
        this.User = utils.CreateUser(user);
        this.Pages = new PageRepository(StaticText).Get();
        // Set the # router
        this.UrlRouter = new Router(this.Pages);
        this.UrlRouter.Initialise();
        this.MessageMediator = new Mediator(this.UrlRouter);
        this.SetJobs(jobs, utils);
        this.SetUsers(users, utils);
        this.SetAssessments(assessments, utils);
        this.SetChatPosts(chatPosts, utils);
        this.SetTimeline(jobs, eras, utils);
        this.MessageStatus = messageStatus;
        this.CurrentMessage = currentMessage;
        this.SetMenuItems(this.Pages);
        this.CurrentPage = ko.observable(_.first(this.Pages));
        this.MenuVisible = ko.observable(false);
        // this.PageContentVisible = ko.computed(() => !this.MenuVisible) ;
        this.PageContentVisible = ko.observable(true);
        this.SetPage(_.first(this.Pages).ID, true);
    }
    // PUBLIC METHODS
    AppModel.prototype.ToggleMenu = function () {
        Model.MenuVisible(!Model.MenuVisible());
        Model.PageContentVisible(!Model.MenuVisible());
    };
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
    AppModel.prototype.SetPage = function (pageId, pageLoad) {
        var _this = this;
        if (pageLoad === void 0) { pageLoad = false; }
        var page = this.GetPageById(this.Pages, pageId);
        var menuHelper = new MenuHelper(this.ErrorHandler);
        this.MenuItems.forEach(function (x) {
            _this.SetSelectedMenuItem(x, page);
            if (x.SubItems && x.SubItems.length > 0) {
                x.SubItems.forEach(function (sub) {
                    _this.SetSelectedMenuItem(sub, page);
                });
            }
        });
        this.PageContentVisible(true);
        this.MenuVisible(false);
        var mainPageId = "page-content-container";
        this.CurrentPage(page);
        this.InsertTemplate(page, mainPageId);
        if (!pageLoad) {
            this.ApplyBindings(mainPageId);
        }
    };
    // PRIVATE METHODS
    AppModel.prototype.ApplyBindings = function (mainPageId) {
        var element = document.getElementById(mainPageId);
        ko.cleanNode(element);
        ko.applyBindings(StaticText, document.getElementById(mainPageId));
    };
    AppModel.prototype.GetPageById = function (pages, pageId) {
        var _this = this;
        var page;
        page = this.GetPageInCollectionById(pageId, pages);
        if (!page) {
            pages.forEach(function (p) {
                var children = p.ChildrenPages;
                if (children && children.length > 0) {
                    var result = _this.GetPageInCollectionById(pageId, children);
                    if (result) {
                        page = result;
                        return page;
                    }
                }
            });
        }
        return page;
    };
    AppModel.prototype.GetPageInCollectionById = function (pageId, pages) {
        return _.find(pages, function (p) { return p.ID === pageId; });
    };
    AppModel.prototype.InsertTemplate = function (page, mainPageId) {
        var container = $("#" + mainPageId);
        var pageVariable = page.PartialFileName.replace(".html", "_html");
        container.html(eval(pageVariable));
        if (page.PartialFileName === "career.html") {
            window.timeline = new TL.Timeline('timeline-embed', this.Timeline);
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
    AppModel.prototype.SetMenuItems = function (pages) {
        var _this = this;
        var menuItems = new Array();
        pages.forEach(function (page) {
            var subitems = new Array();
            if (page.ChildrenPages && page.ChildrenPages.length > 0) {
                page.ChildrenPages.forEach(function (child) {
                    subitems.push(new MenuItem(child, MenuItemLevel.Two, null, _this.MessageMediator));
                });
            }
            menuItems.push(new MenuItem(page, MenuItemLevel.One, subitems, _this.MessageMediator));
        });
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
    AppModel.prototype.SetTimeline = function (jobs, eras, utils) {
        var timelineSlides = new Array();
        jobs.forEach(function (x) { return timelineSlides.push(utils.CreateTimelineSlide(x, utils)); });
        var timelineEras = new Array();
        eras.forEach(function (x) { return timelineEras.push(utils.CreateTimelineEra(x)); });
        this.Timeline = new Timeline(timelineSlides, timelineEras);
    };
    return AppModel;
}());
