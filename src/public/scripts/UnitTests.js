/// <reference path="../models/ErrorHandler.ts" />
/// <reference path="../models/MenuItem.ts" />
/// <reference path="../models/Page.ts" />
"use strict";
var MenuHelper = (function () {
    function MenuHelper(errorHandler) {
        this.ErrorHandler = errorHandler;
    }
    MenuHelper.prototype.SetSelectedPage = function (menuItems, page) {
        var _this = this;
        menuItems.forEach(function (x) {
            _this.SetSelectedMenuItem(x, page);
            if (x.SubItems && x.SubItems.length > 0) {
                x.SubItems.forEach(function (sub) {
                    _this.SetSelectedMenuItem(sub, page);
                });
            }
        });
    };
    MenuHelper.prototype.SetSelectedMenuItem = function (menuItem, page) {
        if (menuItem.Page === page) {
            menuItem.Selected(true);
        }
        else {
            menuItem.Selected(false);
        }
    };
    return MenuHelper;
}());
exports.MenuHelper = MenuHelper;

/// <reference path="Subscription.ts" />
/// <reference path="../models/Router.ts" />
"use strict";
var Subscription_1 = require('./Subscription');
var Mediator = (function () {
    function Mediator(urlRouter) {
        this.Channels = {};
        this.UrlRouter = urlRouter;
        this.Subscribe("ChangePage", this.UrlRouter, this.UrlRouter.NavigateTo);
    }
    Mediator.prototype.PublishChangePage = function (args) {
        this.Publish("ChangePage", args);
    };
    Mediator.prototype.Publish = function (channelName, args) {
        if (!this.Channels[channelName]) {
            // TODO: Log error on error handler via mediator
            return;
        }
        var channel = this.Channels[channelName];
        var args = Array.prototype.slice.call(arguments, 1);
        channel.forEach(function (subscription) {
            subscription.Func.apply(subscription.Context, args);
        });
    };
    Mediator.prototype.Subscribe = function (channelName, context, func) {
        if (!this.Channels[channelName]) {
            this.Channels[channelName] = new Array();
        }
        var channel = this.Channels[channelName];
        channel.push(new Subscription_1.Subscription(context, func));
    };
    return Mediator;
}());
exports.Mediator = Mediator;

"use strict";
var Subscription = (function () {
    function Subscription(context, func) {
        this.Context = context;
        this.Func = func;
    }
    return Subscription;
}());
exports.Subscription = Subscription;

/// <reference path="Job.ts" />
/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="../resources/UiText.ts" />
/// <reference path="ExperienceItem.ts" />
/// <reference path="UiTextManager.ts" />
/// <reference path="../helpers/MenuHelper.ts" />
/// <reference path="../custom_typings/KnockoutBindingHandlers.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/timelinejs/timelinejs.d.ts" />
"use strict";
var Enums_1 = require('../../shared/models/Enums');
var ExperienceItem_1 = require('./ExperienceItem');
var Router_1 = require('./Router');
var MenuItem_1 = require('./MenuItem');
var Utilities_1 = require('./Utilities');
var Mediator_1 = require('../mediator/Mediator');
var MenuHelper_1 = require('../helpers/MenuHelper');
var PageRepository_1 = require('../repositories/PageRepository');
var AppModel = (function () {
    function AppModel(experience, jobs, logger, errorHandler) {
        var utils = new Utilities_1.Utilities(errorHandler);
        this.ErrorHandler = errorHandler;
        this.Experience = this.GetExperience(experience, StaticText);
        this.ExperienceServer = _.filter(this.Experience, function (o) { return o.Type == Enums_1.TechnologyType.Server; });
        this.ExperienceDatabase = _.filter(this.Experience, function (o) { return o.Type == Enums_1.TechnologyType.Database; });
        this.ExperienceFrontEnd = _.filter(this.Experience, function (o) { return o.Type == Enums_1.TechnologyType.FrontEnd; });
        this.Pages = new PageRepository_1.PageRepository(StaticText).Get();
        this.UrlRouter = new Router_1.Router(this.Pages);
        this.MessageMediator = new Mediator_1.Mediator(this.UrlRouter);
        this.SetJobs(jobs, utils);
        this.MessageStatus = Enums_1.MessageDisplayStatus.None;
        this.CurrentMessage = "";
        this.SetMenuItems(this.Pages);
        var startingPage = _.first(this.Pages);
        this.CurrentPage = ko.observable(startingPage);
        this.MenuVisible = ko.observable(false);
        this.PageContentVisible = ko.observable(true);
        this.MainPageId = "page-content-container";
    }
    // PUBLIC METHODS
    AppModel.prototype.ToggleMenu = function () {
        Model.MenuVisible(!Model.MenuVisible());
        Model.PageContentVisible(!Model.MenuVisible());
    };
    AppModel.prototype.SetMessage = function (messageStatus, message) {
        this.CurrentMessage = message;
        this.MessageStatus = messageStatus;
    };
    AppModel.prototype.ClearMessage = function () {
        this.CurrentMessage = "";
        this.MessageStatus = Enums_1.MessageDisplayStatus.None;
    };
    AppModel.prototype.SetPage = function (pageId, pageLoad) {
        var _this = this;
        if (pageLoad === void 0) { pageLoad = false; }
        $('html,body').scrollTop(0);
        var page = this.GetPageById(this.Pages, pageId);
        var menuHelper = new MenuHelper_1.MenuHelper(this.ErrorHandler);
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
        this.CurrentPage(page);
        this.InsertTemplate(page, this.MainPageId);
        if (!pageLoad) {
            this.ApplyBindings(this.MainPageId);
        }
    };
    AppModel.prototype.ApplyBindings = function (mainPageId) {
        var element = document.getElementById(mainPageId);
        ko.cleanNode(element);
        ko.bindingHandlers.slideVertical = {
            init: function (element, valueAccessor) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                $(element).toggle(value);
            },
            update: function (element, valueAccessor) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                value ? $(element).slideDown() : $(element).slideUp();
            }
        };
        ko.applyBindings(StaticText, document.getElementById(mainPageId));
    };
    // PRIVATE METHODS
    AppModel.prototype.GetExperience = function (experienceRecords, staticText) {
        var experience = new Array();
        experienceRecords.forEach(function (x) {
            experience.push(new ExperienceItem_1.ExperienceItem(x.Name, x.Years, x.Type, staticText));
        });
        return experience;
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
        /* Timeline JS3 can't be used with FontAwesome. Use when fixed.
        if (page.PartialFileName === "career.html") {
            window.timeline = new TL.Timeline('timeline-embed', this.Timeline);
        }
        */
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
                    subitems.push(new MenuItem_1.MenuItem(child, Enums_1.MenuItemLevel.Two, null, _this.MessageMediator));
                });
            }
            menuItems.push(new MenuItem_1.MenuItem(page, Enums_1.MenuItemLevel.One, subitems, _this.MessageMediator));
        });
        this.MenuItems = menuItems;
    };
    AppModel.prototype.SortJobs = function () {
        this.Jobs = _.orderBy(this.Jobs, ['Start'], ['desc']);
    };
    AppModel.prototype.SetJobs = function (jobs, utils) {
        var _this = this;
        this.Jobs = new Array();
        jobs.forEach(function (x) { return _this.Jobs.push(utils.CreateJob(x)); });
        this.SortJobs();
    };
    return AppModel;
}());
exports.AppModel = AppModel;

/// <reference path="Logger.ts" />
/// <reference path="AppModel.ts" />
"use strict";
var Enums_1 = require('../../shared/models/Enums');
var CvErrorHandler = (function () {
    function CvErrorHandler(appModel, logger) {
        this.AppModel = appModel;
        this.CvLogger = logger;
    }
    CvErrorHandler.prototype.Handle = function (messageStatus, message) {
        // Display error message
        this.AppModel.SetMessage(messageStatus, message);
        // Log message
        switch (messageStatus) {
            case Enums_1.MessageDisplayStatus.Error:
                this.CvLogger.Error(message);
                break;
            case Enums_1.MessageDisplayStatus.Warning:
                this.CvLogger.Warning(message);
                break;
        }
    };
    CvErrorHandler.prototype.Clear = function () {
        this.AppModel.ClearMessage();
    };
    return CvErrorHandler;
}());
exports.CvErrorHandler = CvErrorHandler;

/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="Logger.ts" />
"use strict";
var Enums_1 = require('../../shared/models/Enums');
var ErrorHandler_1 = require('./ErrorHandler');
var Logger_1 = require('./Logger');
describe("Error Handler", function () {
    var errorHandler;
    var logger;
    var appModel; // To avoid dependencies
    var errorMsg;
    var warnMsg;
    beforeEach(function () {
        logger = new Logger_1.CvLogger();
        appModel = {
            SetMessage: function (messageStatus, message) {
            }
        };
        errorHandler = new ErrorHandler_1.CvErrorHandler(appModel, logger);
        errorMsg = "Test error message";
        warnMsg = "Test warning message";
    });
    it("should contain a logger", function () {
        expect(errorHandler.CvLogger).toBeTruthy();
    });
    it("should contain an AppModel", function () {
        expect(errorHandler.AppModel).toBeTruthy();
    });
    describe("Handle method", function () {
        it("should call AppModel.SetMessage on error", function () {
            spyOn(appModel, "SetMessage");
            errorHandler.Handle(Enums_1.MessageDisplayStatus.Error, errorMsg);
            expect(appModel.SetMessage).toHaveBeenCalled();
        });
        it("should call AppModel.SetMessage on warning", function () {
            spyOn(appModel, "SetMessage");
            errorHandler.Handle(Enums_1.MessageDisplayStatus.Warning, warnMsg);
            expect(appModel.SetMessage).toHaveBeenCalled();
        });
        it("should log error", function () {
            spyOn(logger, "Error");
            errorHandler.Handle(Enums_1.MessageDisplayStatus.Error, errorMsg);
            expect(logger.Error).toHaveBeenCalled();
        });
        it("should log warning", function () {
            spyOn(logger, "Warning");
            errorHandler.Handle(Enums_1.MessageDisplayStatus.Warning, warnMsg);
            expect(logger.Warning).toHaveBeenCalled();
        });
    });
});

/// <reference path="../resources/UiText.ts" />
/// <reference path="../../shared/models/Enums.ts" />
"use strict";
var ExperienceItem = (function () {
    function ExperienceItem(name, years, type, staticText) {
        this.Name = name;
        this.Years = years;
        this.Type = type;
        this.StaticText = staticText;
        this.Description = years === 1 ? years + " " + this.StaticText.Current.Experience_Year : years + " " + this.StaticText.Current.Experience_Years;
    }
    return ExperienceItem;
}());
exports.ExperienceItem = ExperienceItem;

"use strict";
var Job = (function () {
    function Job(company, description, start, end, isCurrent, imageUrl) {
        this.Company = company;
        this.Description = description;
        this.Start = start;
        this.End = end;
        this.IsCurrent = isCurrent;
        this.ImageUrl = imageUrl;
        this.DatesString = this.DateString(start) + " - " + this.DateString(end);
    }
    Job.prototype.DateString = function (date) {
        return this.GetMonth(date) + " " + this.GetYear(date);
    };
    Job.prototype.GetMonth = function (date) {
        return date.toLocaleDateString("en-gb", { month: "long" });
    };
    Job.prototype.GetYear = function (date) {
        return date.getFullYear().toString();
    };
    return Job;
}());
exports.Job = Job;

/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="Job.ts" />
"use strict";
var Job_1 = require('./Job');
describe("Job", function () {
    var job;
    var company;
    var description;
    var start;
    var end;
    var isCurrent;
    var imageUrl;
    beforeEach(function () {
        company = "Test company";
        description;
        start = new Date(2012, 12, 1);
        end = null;
        isCurrent = true;
        imageUrl = "images/adc.jpg";
        job = new Job_1.Job(company, description, start, end, isCurrent, imageUrl);
    });
    it("should contain company", function () {
        expect(job.Company).toEqual(company);
    });
    it("should contain description", function () {
        expect(job.Description).toEqual(description);
    });
    it("should contain start date", function () {
        expect(job.Start).toBeTruthy();
        expect(job.Start).toEqual(start);
    });
    it("should contain end date equal to set", function () {
        expect(job.End).toEqual(end);
    });
    it("should contain company", function () {
        expect(job.Company).toEqual(company);
    });
    it("should contain is current flag", function () {
        expect(job.IsCurrent).toEqual(isCurrent);
    });
    it("should contain image URL", function () {
        expect(job.ImageUrl).toEqual(imageUrl);
    });
});

"use strict";
var CvLogger = (function () {
    function CvLogger() {
    }
    CvLogger.prototype.Error = function (message) {
        console.log("Error: " + message);
    };
    CvLogger.prototype.Warning = function (message) {
        console.log("Warning: " + message);
    };
    return CvLogger;
}());
exports.CvLogger = CvLogger;

/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="Logger.ts" />
"use strict";
var Logger_1 = require('./Logger');
describe("Logger", function () {
    var logger;
    beforeEach(function () {
        logger = new Logger_1.CvLogger();
    });
    it("should log errors", function () {
        spyOn(logger, "Error");
        logger.Error("Error text");
        expect(logger.Error).toHaveBeenCalled();
    });
    it("should log warnings", function () {
        spyOn(logger, "Warning");
        logger.Warning("Warning text");
        expect(logger.Warning).toHaveBeenCalled();
    });
});

/// <reference path="Page.ts" />
/// <reference path="Router.ts" />
/// <reference path="../mediator/Mediator.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
"use strict";
var MenuItem = (function () {
    function MenuItem(page, level, subItems, mediator) {
        this.Page = page;
        this.SubItems = subItems;
        this.Level = level;
        this.Selected = ko.observable(false);
        this.Expanded = ko.observable(false);
        this.Mediator = mediator;
    }
    MenuItem.prototype.Select = function () {
        if (!this.SubItems || this.SubItems.length === 0) {
            // UrlRouter.NavigateTo(this.Page.Url);
            this.Mediator.PublishChangePage(this.Page.Url);
        }
        else {
            this.Expanded(!this.Expanded());
        }
    };
    return MenuItem;
}());
exports.MenuItem = MenuItem;

/// <reference path="../resources/UiText.ts" />
"use strict";
// declare var StaticText: IUiTextManager;
var Page = (function () {
    function Page(id, displayNameKey, childrenPages, partialFileName, url, staticText, UsesClientSideRouting) {
        if (UsesClientSideRouting === void 0) { UsesClientSideRouting = true; }
        this.StaticText = staticText;
        this.ID = id;
        this.DisplayNameKey = displayNameKey;
        this.DisplayName = this.StaticText.Current[displayNameKey];
        this.UsesClientSideRouting = UsesClientSideRouting;
        if (childrenPages && childrenPages.length > 0) {
            this.ChildrenPages = childrenPages;
            this.PartialFileName = "";
            this.Url = "";
        }
        else {
            this.PartialFileName = partialFileName;
            this.Url = url;
        }
    }
    return Page;
}());
exports.Page = Page;

/// <reference path="../../../../DefinitelyTyped/routie/routie.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="AppModel.ts" />
/// <reference path="Page.ts" />
/// <reference path="../repositories/PageRepository.ts" />
/// <reference path="../../shared/models/Enums.ts" />
"use strict";
var Router = (function () {
    function Router(pages) {
        this.Pages = pages;
    }
    Router.prototype.Initialise = function () {
        var routeData = this.GetRoutieData();
        routie(routeData);
        this.NavigateTo("/");
    };
    Router.prototype.NavigateTo = function (url) {
        routie(url);
    };
    Router.prototype.GetRoutieData = function () {
        var _this = this;
        var routes = {};
        this.Pages.forEach(function (page) {
            var children = page.ChildrenPages;
            if (children && children.length > 0) {
                children.forEach(function (childPage) {
                    _this.AddPageRoute(childPage, routes);
                });
            }
            else {
                _this.AddPageRoute(page, routes);
            }
        });
        return routes;
    };
    Router.prototype.AddPageRoute = function (page, routes) {
        routes[page.Url] = new Function('p', 'Model.SetPage(' + page.ID + ')');
    };
    return Router;
}());
exports.Router = Router;

/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="../resources/UiText.ts" />
"use strict";
var Enums_1 = require('../../shared/models/Enums');
var UiTextManager = (function () {
    // Other languages here
    function UiTextManager(cultureCode) {
        // Define languages
        this.enGB = new en_gb();
        // Set current language
        this.SelectLanguage(cultureCode);
    }
    UiTextManager.prototype.SelectLanguage = function (cultureCode) {
        switch (cultureCode) {
            case Enums_1.CultureCode.en_GB:
                this.Current = this.enGB;
                break;
            case Enums_1.CultureCode.fr_FR:
                break;
            case Enums_1.CultureCode.de_DE:
                break;
            case Enums_1.CultureCode.pt_BR:
                break;
            case Enums_1.CultureCode.es_ES:
                break;
        }
    };
    return UiTextManager;
}());
exports.UiTextManager = UiTextManager;

/// <reference path="Job.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
"use strict";
var Enums_1 = require('../../shared/models/Enums');
var Enums_2 = require('../../shared/models/Enums');
var Job_1 = require('./Job');
var Utilities = (function () {
    function Utilities(errorHandler) {
        this.ErrorHandler = errorHandler;
    }
    // DATA ACCESS METHODS
    Utilities.prototype.Get = function (url) {
        return this.CallServer(Enums_1.HttpVerb.GET, url, null);
    };
    Utilities.prototype.Post = function (url, postData) {
        return this.CallServer(Enums_1.HttpVerb.POST, url, postData);
    };
    Utilities.prototype.CallServer = function (httpVerb, url, postData) {
        var _this = this;
        var verb;
        switch (httpVerb) {
            case Enums_1.HttpVerb.GET:
                $.ajax({
                    url: url,
                    type: 'GET',
                    success: (function (data) {
                        return data;
                    }),
                    error: (function (jq, status, message) {
                        _this.ErrorHandler.Handle(Enums_2.MessageDisplayStatus.Error, "An error has occurred while getting data from the server. Status: " + status + ' - Message: ' + message);
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
                        _this.ErrorHandler.Handle(Enums_2.MessageDisplayStatus.Error, "An error has occurred while posting data to the server. Status: " + status + ' - Message: ' + message);
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
        return new Job_1.Job(j.Company, j.Description, new Date(j.Start), new Date(j.End), j.IsCurrent, j.ImageUrl);
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
}());
exports.Utilities = Utilities;

/// <reference path="../models/Page.ts" />
"use strict";
var Page_1 = require('../models/Page');
var PageRepository = (function () {
    function PageRepository(staticText) {
        this.StaticText = staticText;
        this.NextPageNumber = 1;
    }
    PageRepository.prototype.NewPage = function (displayNameKey, childrenPages, partialFileName, url, usesClientSideRouting) {
        if (usesClientSideRouting === void 0) { usesClientSideRouting = true; }
        var id = this.NextPageNumber;
        this.NextPageNumber++;
        return new Page_1.Page(id, displayNameKey, childrenPages, partialFileName, url, this.StaticText, usesClientSideRouting);
    };
    PageRepository.prototype.Get = function () {
        var pages = new Array();
        pages.push(this.NewPage("Menu_Home", null, "home.html", "/"));
        pages.push(this.NewPage("Menu_Experience", null, "experience.html", "/experience"));
        pages.push(this.NewPage("Menu_About", null, "about.html", "/about"));
        pages.push(this.NewPage("Menu_Career", null, "career.html", "/career"));
        this.AddObjectOrientedPrinciplePages(pages);
        this.AddSolidPrinciplePages(pages);
        this.AddOtherPrinciplePages(pages);
        this.AddDesignPatternPages(pages);
        this.AddServerTechnologyPages(pages);
        this.AddDatabaseTechnologyPages(pages);
        this.AddJavascriptTechnologyPages(pages);
        return pages;
    };
    PageRepository.prototype.AddObjectOrientedPrinciplePages = function (pages) {
        var ooPrinciplesChildrenPages = new Array();
        ooPrinciplesChildrenPages.push(this.NewPage("Principles_Encapsulation_Title", null, "principles_encapsulation.html", "/principles_encapsulation"));
        ooPrinciplesChildrenPages.push(this.NewPage("Principles_Inheritance_Title", null, "principles_inheritance.html", "/principles_inheritance"));
        ooPrinciplesChildrenPages.push(this.NewPage("Principles_Abstraction_Title", null, "principles_abstraction.html", "/principles_abstraction"));
        ooPrinciplesChildrenPages.push(this.NewPage("Principles_Polymorphism_Title", null, "principles_polymorphism.html", "/principles_polymorphism"));
        ooPrinciplesChildrenPages.push(this.NewPage("Principles_Composition_Title", null, "principles_composition.html", "/principles_compositionoverinheritance"));
        var ooPrinciplesPage = this.NewPage("Menu_OOPrinciples", ooPrinciplesChildrenPages, "", "");
        pages.push(ooPrinciplesPage);
    };
    PageRepository.prototype.AddSolidPrinciplePages = function (pages) {
        var solidPrinciplesChildrenPages = new Array();
        solidPrinciplesChildrenPages.push(this.NewPage("Principles_SR_Title", null, "principles_sr.html", "/principles_singleresponsibility"));
        solidPrinciplesChildrenPages.push(this.NewPage("Principles_OC_Title", null, "principles_oc.html", "/principles_openclosed"));
        solidPrinciplesChildrenPages.push(this.NewPage("Principles_Liskov_Title", null, "principles_liskov.html", "/principles_liskov"));
        solidPrinciplesChildrenPages.push(this.NewPage("Principles_IS_Title", null, "principles_is.html", "/principles_interfacesegregation"));
        solidPrinciplesChildrenPages.push(this.NewPage("Principles_DI_Title", null, "principles_di.html", "/principles_dependencyinversion"));
        var solidPrinciplesPage = this.NewPage("Menu_SolidPrinciples", solidPrinciplesChildrenPages, "", "");
        pages.push(solidPrinciplesPage);
    };
    PageRepository.prototype.AddOtherPrinciplePages = function (pages) {
        var principlesChildrenPages = new Array();
        principlesChildrenPages.push(this.NewPage("Principles_DRY_Title", null, "principles_dry.html", "/principles_dry"));
        principlesChildrenPages.push(this.NewPage("Principles_Automation_Title", null, "principles_automation.html", "/principles_automation"));
        principlesChildrenPages.push(this.NewPage("Principles_CD_Title", null, "principles_cd.html", "/principles_continuousdelivery"));
        var principlesPage = this.NewPage("Menu_Principles", principlesChildrenPages, "", "");
        pages.push(principlesPage);
    };
    PageRepository.prototype.AddDesignPatternPages = function (pages) {
        var designPatternPages = new Array();
        designPatternPages.push(this.NewPage("DesignPatterns_Observer_Title", null, "design_pattern_observer.html", "/design_pattern_observer"));
        designPatternPages.push(this.NewPage("DesignPatterns_Mediator_Title", null, "design_pattern_mediator.html", "/design_pattern_mediator"));
        designPatternPages.push(this.NewPage("DesignPatterns_ChainOfResponsibility_Title", null, "design_pattern_chain_of_responsibility.html", "/design_pattern_chain_of_responsibility"));
        designPatternPages.push(this.NewPage("DesignPatterns_Factory_Title", null, "design_pattern_factory.html", "/design_pattern_factory"));
        designPatternPages.push(this.NewPage("DesignPatterns_Facade_Title", null, "design_pattern_facade.html", "/design_pattern_facade"));
        var designPatternPage = this.NewPage("Menu_DesignPatterns", designPatternPages, "", "");
        pages.push(designPatternPage);
    };
    PageRepository.prototype.AddServerTechnologyPages = function (pages) {
        var technologiesChildrenPages = new Array();
        technologiesChildrenPages.push(this.NewPage("Technologies_CSharp_Title", null, "programming_csharp.html", "/programming_csharp"));
        technologiesChildrenPages.push(this.NewPage("Technologies_MVC_Title", null, "programming_mvc.html", "/programming_mvc"));
        technologiesChildrenPages.push(this.NewPage("Technologies_WebForms_Title", null, "programming_webforms.html", "/programming_webforms"));
        technologiesChildrenPages.push(this.NewPage("Technologies_NodeJS_Title", null, "programming_nodejs.html", "/programming_nodejs"));
        technologiesChildrenPages.push(this.NewPage("Technologies_iText_Title", null, "programming_itext.html", "/programming_itext"));
        technologiesChildrenPages.push(this.NewPage("Technologies_NUnit_Title", null, "programming_nunit.html", "/programming_nunit"));
        technologiesChildrenPages.push(this.NewPage("Technologies_PowerShell_Title", null, "programming_powershell.html", "/programming_powershell"));
        var technologiesPage = this.NewPage("Menu_ServerTechnologies", technologiesChildrenPages, "", "");
        pages.push(technologiesPage);
    };
    PageRepository.prototype.AddDatabaseTechnologyPages = function (pages) {
        var dbTechnologiesChildrenPages = new Array();
        dbTechnologiesChildrenPages.push(this.NewPage("Technologies_SqlServer_Title", null, "programming_sqlserver.html", "/programming_sqlserver"));
        dbTechnologiesChildrenPages.push(this.NewPage("Technologies_MySql_Title", null, "programming_mysql.html", "/programming_mysql"));
        dbTechnologiesChildrenPages.push(this.NewPage("Technologies_MongoDB_Title", null, "programming_mongodb.html", "/programming_mongodb"));
        var dbTechnologiesPage = this.NewPage("Menu_DatabaseTechnologies", dbTechnologiesChildrenPages, "", "");
        pages.push(dbTechnologiesPage);
    };
    PageRepository.prototype.AddJavascriptTechnologyPages = function (pages) {
        var jsTechnologiesChildrenPages = new Array();
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Typescript_Title", null, "programming_typescript.html", "/programming_typescript"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Knockout_Title", null, "programming_knockout.html", "/programming_knockout"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_React_Title", null, "programming_react.html", "/programming_react"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Angular1_Title", null, "programming_angular1.html", "/programming_angular1"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Angular2_Title", null, "programming_angular2.html", "/programming_angular2"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Jasmine_Title", null, "programming_jasmine.html", "/programming_jasmine"));
        jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Mocha_Title", null, "programming_mocha.html", "/programming_mocha"));
        var jsTechnologiesPage = this.NewPage("Menu_JavascriptTechnologies", jsTechnologiesChildrenPages, "", "");
        pages.push(jsTechnologiesPage);
    };
    return PageRepository;
}());
exports.PageRepository = PageRepository;

/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../resources/UiText.ts" />
/// <reference path="../repositories/PageRepository.ts" />
/// <reference path="../models/Page.ts" />
"use strict";
var UiTextManager_1 = require('../models/UiTextManager');
var Enums_1 = require('../../shared/models/Enums');
var PageRepository_1 = require('./PageRepository');
describe("Page Repository", function () {
    var uiText;
    var repo;
    var pages;
    beforeEach(function () {
        uiText = new UiTextManager_1.UiTextManager(Enums_1.CultureCode.en_GB);
        repo = new PageRepository_1.PageRepository(uiText);
        pages = repo.Get();
    });
    it("should return some pages", function () {
        expect(pages).toBeTruthy();
        expect(pages.length).toBeGreaterThan(0);
    });
    it("should return pages with property values set", function () {
        pages.forEach(function (page) {
            expect(page.ID).toBeTruthy();
            expect(page.DisplayNameKey).toBeTruthy();
            expect(page.DisplayName).toBeTruthy();
            expect(page.StaticText).toBeTruthy();
            if (page.ChildrenPages && page.ChildrenPages.length > 0) {
                expect(page.PartialFileName).not.toBeTruthy();
                expect(page.Url).not.toBeTruthy();
            }
            else {
                if (page.UsesClientSideRouting) {
                    expect(page.PartialFileName).toBeTruthy();
                }
                expect(page.Url).toBeTruthy();
            }
        });
    });
});

/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="en-GB.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

/// <reference path="UiText.ts" />
var en_gb = (function () {
    function en_gb() {
        this.Banner_Logo = "Justin R";
        this.Banner_Slogan1 = "Create";
        this.Banner_Slogan2 = "Improve";
        this.Banner_Slogan3 = "Inspire";
        this.Footer_Copyright = "© Justin Rickard " + new Date().getFullYear();
        this.Login_Title = "Login";
        this.Login_Username = "Username";
        this.Login_Password = "Password";
        this.Login_LoginButton = "Log me in!";
        this.Login_Register_Title = "Register";
        this.Login_Register_Button = "Sign me up!";
        this.Login_ForgottenPassword_Button = "Remind me!";
        this.Login_ForgottenPassword_Title = "Forgotten password?";
        this.Home_Title = "Welcome!";
        this.Home_P1 = "In this online CV app, I mention:";
        this.Home_P1_B1 = "How I like to work";
        this.Home_P1_B2 = "My previous jobs";
        this.Home_P1_B3 = "Principles of software development";
        this.Home_P1_B4 = "Design patterns";
        this.Home_P1_B5 = "Technologies I am familiar with";
        this.Home_P2 = "Use the menu to navigate to each page.";
        this.About_Title = "About me";
        this.About_P1 = "As a software developer, these are my top 5 philosophies:";
        this.About_P1_B1 = "Automation";
        this.About_P1_B1_P1 = "In order to maximise productivity, any repeatedly performed tasks should be automated so you can spend more time developing. This can often be done by writing scripts, such as PowerShell on Windows and Bash on Unix and Linux. For more complex tasks such as automated application deployment, external tools may need to be used such as TeamCity, Jenkins or Team Foundation Server (TFS).";
        this.About_P1_B2 = "Refactoring";
        this.About_P1_B2_P1 = "Code can very easily become messy due to many factors. It is important to refactor your newly written code as you go along, and before each commit to check whether anything can be refactored or made more generic. Repeated code is costly to maintain, so look out for it. And if you spot it, refactor it!";
        this.About_P1_B3 = "Laying a solid foundation";
        this.About_P1_B3_P1 = "It is very tempting to quickly knock together a working feature or application to either show that you are making good progress or to give an early demonstration to stakeholders. While this is sometimes necessary, it should be avoided when possible. From experience, it is always a lot quicker to lay a sturdy foundation first, then write the rest of your code on top of it. The problem with skipping the foundation laying is that once your code works, you then need to dig it up to ensure it is written properly, which often takes more effort than you had predicted. Another disadvantage is that some parts of the foundation never get done as the project deadline looms... and the final product is less robust than you had intended. The larger the project, the more important it is to lay good foundations right from the start.";
        this.About_P1_B4 = "Use up-to-date technology";
        this.About_P1_B4_P1 = "It is very common for a technology to be used in a software project, and as the software ages the technology used becomes out of date. Often this is because it can be difficult to change, more so if your code is tightly coupled. The main problem with out-of-date technology is that there is little or no support for it, and often there will be bugs that are fixed in a later release. ";
        this.About_P1_B5 = "Be organised";
        this.About_P1_B5_P1 = "Working in an organised manner is necessary in order to for you and your team to work efficiently. For me, being organised includes doing the following:";
        this.About_P1_B5_P1_B1 = "Regularly writing down updates on your tickets";
        this.About_P1_B5_P1_B2 = "Keeping colleagues, stakeholders and line managers up-to-date";
        this.About_P1_B5_P1_B3 = "Writing documentation for any new feature you develop";
        this.About_P1_B5_P1_B4 = "Put your code files into separate folders where appropriate";
        this.About_P1_B5_P1_B5 = "Regularly commit changes to source control";
        this.About_P1_B5_P1_B6 = "Ensure any important files you have are backed up";
        this.About_P1_B5_P1_B7 = "Keeping code files small and manageable";
        this.Experience_Title = "Experience";
        this.Experience_Year = "year";
        this.Experience_Years = "years";
        this.Experience_FrontEnd = "Front-End";
        this.Experience_Database = "Database";
        this.Experience_Server = "Server";
        this.Career_Title = "My Career";
        this.Career_P1 = "Take a look at my professional experience using the timeline below.";
        this.DesignPatterns_Observer_Title = "Observer";
        this.DesignPatterns_Observer_P1 = "The observer pattern facilitates communication between different parts of a system in the following way:";
        this.DesignPatterns_Observer_P1_B1 = "Objects that need to be informed of a change are called \"obsevers\"";
        this.DesignPatterns_Observer_P1_B2 = "Observers register themselves with an object that performs a certain action (subject)";
        this.DesignPatterns_Observer_P1_B3 = "When the subject completes an action, a notify() method is run";
        this.DesignPatterns_Observer_P1_B4 = "The notify method informs each registered observer of the action";
        this.DesignPatterns_Observer_P1_B5 = "Each observer processes this message in whatever way they need to";
        this.DesignPatterns_Mediator_Title = "Mediator";
        this.DesignPatterns_Mediator_P1 = "The mediator pattern can be thought of as similar to the observer pattern but allows for more decoupled code:";
        this.DesignPatterns_Mediator_P1_B1 = "Observers register with the mediator on a channel.";
        this.DesignPatterns_Mediator_P1_B2 = "When subjects complete an action, they inform the mediator.";
        this.DesignPatterns_Mediator_P1_B3 = "When the mediator receives an update from a subject, it passes it on to the observers of that channel.";
        this.DesignPatterns_Mediator_P2 = "A major benefit of the mediator pattern is that it can vastly simplify the communication between different parts of your application.";
        this.DesignPatterns_ChainOfResponsibility_Title = "Chain of Responsibility";
        this.DesignPatterns_ChainOfResponsibility_P1 = "The chain of responsibily pattern:";
        this.DesignPatterns_ChainOfResponsibility_P1_B1 = "Provides decoupling of the sender of a request and receiver";
        this.DesignPatterns_ChainOfResponsibility_P1_B2 = "Gives more than one object a chance to handle the request";
        this.DesignPatterns_ChainOfResponsibility_P1_B3 = "The request is passed along the chain until it is handled";
        this.DesignPatterns_Factory_Title = "Factory";
        this.DesignPatterns_Factory_P1 = "The factory pattern:";
        this.DesignPatterns_Factory_P1_B1 = "Is a creational design pattern";
        this.DesignPatterns_Factory_P1_B2 = "Hides the creation logic from the client";
        this.DesignPatterns_Factory_P1_B3 = "Newly created objects implement a common interface";
        this.DesignPatterns_Facade_Title = "Facade";
        this.DesignPatterns_Facade_P1 = "The facade pattern:";
        this.DesignPatterns_Facade_P1_B1 = "Provides a simplified interface to a larger body of code.";
        this.DesignPatterns_Facade_P1_B2 = "Defines a higher-level interface that  makes a subsystem easier to use";
        this.Principles_DRY_Title = "Don't repeat yourself";
        this.Principles_DRY_Paragraph1 = "For me, DRY is the most important principle to follow when programming for the following reasons:";
        this.Principles_DRY_Paragraph1_B1 = "Code will be more easily maintainable as logic is in one place only";
        this.Principles_DRY_Paragraph1_B2 = "Code can very easily be split out to other files if necessary";
        this.Principles_DRY_Paragraph1_B3 = "Code will be more legible and nice to work with";
        this.Principles_DRY_Paragraph1_B4 = "Files and projects will not grow unnecessarily large";
        this.Principles_DRY_Paragraph1_B5 = "Bugs will appear less frequently if changes need to be made in one place only";
        this.Principles_Automation_Title = "Automation";
        this.Principles_Automation_Paragraph1 = "It is important for a software team's productivity for all repeated tasks to be automated. While an initial effort is required to script up, test and maintain these tasks, much time will be saved in the long-term.";
        this.Principles_Automation_Paragraph2 = "The following are common tasks for a software development team that should normally be automated";
        this.Principles_Automation_Paragraph2_B1 = "Building an application";
        this.Principles_Automation_Paragraph2_B2 = "Deploying an application";
        this.Principles_Automation_Paragraph2_B3 = "Compiling CSS and Javascript when source files are changed in a development environment";
        this.Principles_Automation_Paragraph2_B4 = "Regular data retrieval";
        this.Principles_CD_Title = "Continuous delivery";
        this.Principles_CD_Paragraph1 = "The terms \"Continuous Delivery\" and \"Continuous Integration\" have become very fashionable terms recently, with many people having their own opinions on their meanings. For me, Continous Delivery means that our software project is always in a position where it could be deployed (or delivered) if needed. This can be achieved by";
        this.Principles_CD_Paragraph1_B1 = "Using a build server such as TeamCity, Jenkins or Team Foundation Server (TFS)";
        this.Principles_CD_Paragraph1_B2 = "Build server alerts the team when a commit breaks the build or causes any automated tests to fail";
        this.Principles_CD_Paragraph1_B3 = "Ensuring the team has a culture of fixing the build as a first priority, and not to make commits on top of a broken build";
        this.Principles_CD_Paragraph1_B4 = "Preventing a commit to the mainline trunk if it breaks the build or causes an automated test to fail (although some teams find this overly restrictive)";
        this.Principles_Encapsulation_Title = "Encapsulation";
        this.Principles_Encapsulation_Paragraph1 = "Encapsulation is a principle of object-oriented programming that is about hiding the inner workings of a class, while providing a simple interface to interact with it.";
        this.Principles_Encapsulation_Paragraph2 = "For example we may have a Person class with a method EatBiscuit(biscuit). Within the EatBiscuit method, there may be several inner methods being called in succession, such as OpenBiscuitTin(), GetBiscuit(biscuit), ShoveInMouth(biscuit). By wrapping up these 3 consecutive methods into one method, we make the interaction with the Person object simpler.";
        this.Principles_Inheritance_Title = "Inheritance";
        this.Principles_Inheritance_Paragraph1 = "Inheritance is an object-oriented principle that allows re-use of functionality by providing a hierarchical class structure.";
        this.Principles_Inheritance_Paragraph2 = "For example: cars, vans, lorries, buses, bikes and motorbikes are all forms of vehicles. Therefore it may make sense to have a base class called Vehicle that all of these could inherit. The vehicle class could have common methods such as Accelerate, Brake, Reverse, Turn as well as common properties such as NumerOfSeats, NumberOfWheels, etc.";
        this.Principles_Inheritance_Paragraph3 = " The use of class inheritance is actually becoming less popular as the use of Interface Composition is becoming more popular.";
        this.Principles_Composition_Title = "Interface composition";
        this.Principles_Composition_Paragraph1 = "Interface composition allows classes to have multiple behaviours by implementing multiple interfaces. This has become more popular in recent years and by many preferred over inheritance in order to achieve polymorphism.";
        this.Principles_Composition_Paragraph2 = "For example: cars, vans, lorries, buses, bikes and motorbikes are all vehicles. Instead of having them inherit a base class called Vehicle, each class could inherit behaviours via an interface. For example they may all implement the Accelerate, Brake and Turn behaviours. However it could be that only bikes and motorbikes implement the Wheelie behaviour, and that all except these 2 implement the Load/Unload behaviour.";
        this.Principles_Abstraction_Title = "Abstraction";
        this.Principles_Abstraction_Paragraph1 = "Abstraction can be defined as the concept of describing something in simpler terms, focusing only on what is important or relevant.";
        this.Principles_Abstraction_Paragraph2 = "For example, we may have a process that deals with Vehicles objects, without being concerned exactly what type of vehicle it is, since all vehicles have certain properties in common. The Vehicle class may be an abstract class. We could use the technique of Encapsulation to abstract away the complexities of the inner workings of the different classes we interact with.";
        this.Principles_Polymorphism_Title = "Polymorphism";
        this.Principles_Polymorphism_Paragraph1 = "Polymorphism is the ability to present the same interface for different types.";
        this.Principles_Polymorphism_Paragraph2 = "For example, a car class and a bus class would both have a method \"Accelerate()\". However the implementation for each may be different. Each of these classes may implement the IVehicle interface which ensures the Accelerate method exists. The client code would therefore be able to run vehicle.Accelerate() on each item, which would in fact call two different methods, one on the car class and one on the bus class.";
        this.Principles_SR_Title = "Single responsibility principle";
        this.Principles_SR_Paragraph1 = "The Single Responsibility Principle states that every module or class should have one job to do, and one only. As soon as a class is doing more than one job, it is violating this principle.";
        this.Principles_SR_Paragraph2 = "Adhering to this principle makes your software much easier to maintain and change, as any change will only need to be made in one place.";
        this.Principles_SR_Paragraph3 = "For example, your program logs errors to the server when they occur using NLog. Within each class, we could have code along the lines of \"_logger = new NLog.Logger()\" for instantiating the logger, as well as \"_logger.Error(errorMessage)\". Now imagine that you need to change the logging library to another. You would need to change each and every class where logging code exists, to use the new library and its different methods.";
        this.Principles_SR_Paragraph4 = "If we had created a Logger class which handles all the logging, then when it comes to changing the logging library, we would simply need to change the Logger class, and nothing else. This is how adhering to this principle can vastly simplify the maintenance of software.";
        this.Principles_OC_Title = "Open closed principle";
        this.Principles_OC_Paragraph1 = "The Open Closed principle states that modules and classes should be open for extension, but closed for modification.";
        this.Principles_OC_Paragraph2 = "The benefit for this is that your classes and modules may already be in use and depended on by client applications, so avoiding changes avoids creating new bugs. Changing the name of a function for example, could result in a client application breaking. So if we require a change to an existing function, we could create a new function and extend the existing one.";
        this.Principles_Liskov_Title = "Liskov's substitution principle";
        this.Principles_Liskov_Paragraph1 = "Liskov's Substitution Principle (LSP) states that \"Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.\"";
        this.Principles_Liskov_Paragraph2 = "It provides a guideline on when it is appropriate to extend classes, and when an alternative such as composition is best.";
        this.Principles_Liskov_Paragraph3 = "A common example of this is with the shapes Rectangle and Square. It could be said that a Square class should inherit from the Rectangle class because a square is a rectangle, albeit with an equal height and width. However complications can arise with regards to behaviour, since a method \"SetWidth() on a rectangle would affect the width only, however on a square it should also affect the height. As such, the SetWidth() method becomes inappropriate for a square.\" As such, Square should probably not inherit from Rectangle.";
        this.Principles_IS_Title = "Interface segregation principle";
        this.Principles_IS_Paragraph1 = "The Interface Segregation Principle states that clients should not be forced to implement interfaces they don't use.";
        this.Principles_IS_Paragraph2 = "Rather than having large interfaces, it is more flexible to have smaller interfaces that can be used in combination with one-another.";
        this.Principles_IS_Paragraph3 = "For example, cars, cement mixers and motorbikes are all vehicles. If we had an IVehicle interface that each class inherited, this may work for methods such as Accelerate(), Brake(), etc. However the cement mixer would have a method Mix(), which the others would not. Also, the Motorbike class may have a method Wheelie() that the others would not. As such, IVehicle is a polluted interface and is not sufficiently flexible.";
        this.Principles_IS_Paragraph4 = "Rather than having the one IVehicle interface, we would be better off with several: IDriveable, IMixable and IWheelie (or IWheelieable if you prefer). Then the Car class could implement IDriveable, the CementMixer class could implement IDriveable and IMixable and the Motorbike class could implement IDriveable and IWheelie.";
        this.Principles_DI_Title = "Dependency inversion";
        this.Principles_DI_Paragraph1 = "The Dependency Inversion principle states that:";
        this.Principles_DI_Paragraph1_B1 = "High level modules should not depend upon low-level modules. Both should depend upon abstractions.";
        this.Principles_DI_Paragraph1_B2 = "Abstractions should never depend upon details. Details should depend upon abstractions.";
        this.Principles_DI_Paragraph2 = "This principle promotes loose coupling of software modules, which allows software to be more easily unit tested as well as allowing developers to program against interfaces rather than concrete classes which may not exist yet.";
        this.Principles_DI_Paragraph3 = "For example, we may have a method ProcessRegistration() on the RegistrationHandler class, which may ultimately send an email using the SendEmail() on the EmailService class. As such, the method ProcessRegistration() depends on the EmailService class. As such, we cannot unit test this method without calling the EmailService class and sending an email out.";
        this.Principles_DI_Paragraph4 = "In order to reverse this dependency, we can simply pass in the EmailService object when instantiating up the RegistrationHandler class. ";
        // Server Technologies
        this.Technologies_CSharp_Title = "C#";
        this.Technologies_CSharp_Paragraph1 = "C# is an object-oriented language that can be used to write .NET applications. It has a similar syntax to Java.";
        this.Technologies_CSharp_Paragraph2 = "It is my favourite language to code in due to the easy-to-use syntax, its rich features (such as LINQ) and that it can be written in Microsoft Visual Studio.";
        this.Technologies_MVC_Title = "ASP.NET MVC";
        this.Technologies_MVC_Paragraph1 = "This flavour of ASP.NET deals with server-side page rendering by combining 3 types of files - Model, View and Controller.";
        this.Technologies_MVC_Paragraph2 = "The 'Model' (or 'View-Model') is a class that defines what data the view will have access to.";
        this.Technologies_MVC_Paragraph3 = "The 'View' is a HTML template, which can be fed a data model in order to display its content, and enriched with logic using Razor for example.";
        this.Technologies_MVC_Paragraph4 = "The 'Controller' handles the requests from the clients, and responds. Usually this will involve getting data and returning a view. Controller logic should be kept to a minimum in order to keep the code base clean. Tasks should be offloaded to services and models.";
        this.Technologies_WebApi_Title = "Microsoft Web API";
        this.Technologies_WebApi_Paragraph1 = "Web API is Microsoft's tool for creating a JSON API for your web application.";
        this.Technologies_WebApi_Paragraph2 = "The emergence of Single Page Applications (SPA) has lead to many products abandoning server-side rendering and using a Javsscript framework on the front-end that interacts with the server's API layer.";
        this.Technologies_WebForms_Title = "ASP.NET Web Forms";
        this.Technologies_WebForms_Paragraph1 = "Web Forms are an old ASP.NET technology for developing web applications. You would not expect new products to use Web Forms, however there are many legacy systems out there that use it due to its popularity in the past.";
        this.Technologies_WebForms_Paragraph2 = "They make use of a Page file (.aspx) and a Code-Behind file (.aspx.cs). The Page contains the markup, including ASP tags, while the Code-Behind deals with the logic such as button clicks.";
        this.Technologies_NodeJS_Title = "Node JS";
        this.Technologies_NodeJS_Paragraph1 = "Node JS is an open-source technology that allows you to quickly and easily develop a web server in Javascript. This application is written in Node JS.";
        this.Technologies_NodeJS_Paragraph2 = "It is very light-weight, and so you need to import pretty much any tool you need. This contrasts to ASP.NET which comes with a lot of built-in goodies, but results in a larger code base.";
        this.Technologies_NodeJS_Paragraph3 = "Server-side rendering can be achieved using various template plug-ins. My preference is EJS. Single Page Applications can be easily developed using Node JS as the API server.";
        this.Technologies_NodeJS_Paragraph4 = "Node JS is well suited for a simple API server as it is quick to set up. Some people question whether it is an appropriate tool to use for building large enterprise applications.";
        this.Technologies_NodeJS_Paragraph5 = "If a large and complex system is developed in Node JS, it should be architected to use Microservices and possibly a message bus such as RabbitMQ.";
        this.Technologies_NUnit_Title = "NUnit";
        this.Technologies_NUnit_Paragraph1 = "This is the most popular unit testing framework for .NET. I have used this for as long as I have developed in C#. Other popular test frameworks are very similar - if you can use one, you can easily pick up another.";
        this.Technologies_iText_Title = "iText Sharp";
        this.Technologies_iText_Paragraph1 = "This is a PDF generation library for .NET development. It is a good tool and there is a lot of support for it online.";
        this.Technologies_iText_Paragraph2 = "When developing with iText, it is very important not to follow the same style as the documentation's examples. These examples do not have any refactoring applied and do not separate concerns in any way.";
        this.Technologies_iText_Paragraph3 = "From experience, I have found it is important split your code up so that you have:";
        this.Technologies_iText_Paragraph3_B1 = "Renderer class - responsible only for drawing elements";
        this.Technologies_iText_Paragraph3_B2 = "Renderable component classes (with a Renderer class injected)";
        this.Technologies_iText_Paragraph3_B3 = "Renderable sub-components within the components";
        this.Technologies_iText_Paragraph3_B4 = "Settings class - to define document's settings such as margins";
        this.Technologies_iText_Paragraph3_B5 = "Render Manager class - to simulate a component or sub-component render and go-ahead if successful.";
        this.Technologies_PowerShell_Title = "PowerShell";
        this.Technologies_PowerShell_Paragraph1 = "PowerShell is the Windows scripting language that is very powerful. It is great for automating tasks to speed up development.";
        this.Technologies_PowerShell_Paragraph2 = "With PowerShell you can interact with all sorts of applications such as IIS, Task Scheduler and Windows Processes. For this reason, PowerShell is a great tool for automated deployments.";
        // Database Technologies
        this.Technologies_SqlServer_Title = "Microsoft SQL Server";
        this.Technologies_SqlServer_Paragraph1 = "SQL Server is my preferred database as it is very feature-rich and comes with SQL Server Management Studio which makes certain tasks, such as creating backups and restoring very easy.";
        this.Technologies_MySql_Title = "MySql";
        this.Technologies_MySql_Paragraph1 = "I have some experience of using MySQL on Linux servers. When using it, I have missed the benefits that T-SQL brings. Also the GUIs for MySQL are not nearly as good as SQL Server Management Studio.";
        this.Technologies_MongoDB_Title = "MongoDB";
        this.Technologies_MongoDB_Paragraph1 = "MongoDB is a popular No-SQL database. It can be used with Mongoose, the official ORM for MongoDB. I plan on using it for database for this application in the near future.";
        // Javascript Technologies
        this.Technologies_Typescript_Title = "TypeScript";
        this.Technologies_Typescript_Paragraph1 = "I love TypeScript! Why? It solves so many of Javascript's weaknesses.";
        this.Technologies_Typescript_Paragraph2 = "The main problem with Javascript is that it is loosely typed. This often results in run-time errors that would have been caught if it were compiled. TypeScript compiles your .ts file into .js files, and performs type checking. If you have a type mismatch, the compiler will pick it up.";
        this.Technologies_Typescript_Paragraph3 = "TypeScript also allows us to write nice object-oriented code easily, using classes, interfaces, inheritance, etc.";
        this.Technologies_Knockout_Title = "Knockout";
        this.Technologies_Knockout_Paragraph1 = "Knockout is a two-way binding library that is great for quickly getting an interactive page knocked out.";
        this.Technologies_Knockout_Paragraph2 = "It allows you to bind your Javascript data structure to the DOM, in a similar way to Mustache and Handlebars, and has been around for quite a few years.";
        this.Technologies_Knockout_Paragraph3 = "This app has been written using Knockout.";
        this.Technologies_React_Title = "React";
        this.Technologies_React_Paragraph1 = "React is a new Javascript library developed by Facebook.";
        this.Technologies_React_Paragraph2 = "It allows for very fast rendering due to its use of a virtual DOM. It also provides very tight data control due to its uni-directional data flow.";
        this.Technologies_Angular1_Title = "Angular 1";
        this.Technologies_Angular1_Paragraph1 = "Angular is a very commonly used Javascript framework. It provides templating, data-binding, routing, HTTP requests and much more.";
        this.Technologies_Angular2_Title = "Angular 2";
        this.Technologies_Angular2_Paragraph1 = "Angular 2 is an update on Angular 1 and provides various improvements on the previous version.";
        this.Technologies_Jasmine_Title = "Jasmine";
        this.Technologies_Jasmine_Paragraph1 = "Jasmine is a Javascript testing framework. It runs in the browser.";
        this.Technologies_Mocha_Title = "Mocha";
        this.Technologies_Mocha_Paragraph1 = "Mocha is a Javascript test framework that has become very popular recently. I believe this is due to its flexibility - you can choose from a range of assertion libraries (including Jasmine's assertion library), it can run on the command line and in the browser.";
        // Menu Text
        this.Menu_Home = "Home";
        this.Menu_Experience = "Experience";
        this.Menu_About = "About me";
        this.Menu_Career = "My Career";
        this.Menu_OOPrinciples = "Object-Oriented Principles";
        this.Menu_SolidPrinciples = "SOLID Principles";
        this.Menu_Principles = "Other Principles";
        this.Menu_ServerTechnologies = "Server Technologies";
        this.Menu_JavascriptTechnologies = "Javascript Technologies";
        this.Menu_DatabaseTechnologies = "Database Technologies";
        this.Menu_DesignPatterns = "Design Patterns";
    }
    return en_gb;
}());

/// <reference path="../models/User.ts" />
/// <reference path="../helpers/UserHelper.ts" />
var UserFactory = (function () {
    function UserFactory() {
    }
    ;
    UserFactory.prototype.GetUserHelper = function () {
        if (!this.UserHelper) {
            this.UserHelper = new UserHelper();
        }
        return this.UserHelper;
    };
    return UserFactory;
}());

/// <reference path="../models/assessment/Assessment.ts" />
"use strict";
var Assessment_1 = require('../models/assessment/Assessment');
var CaseStudy_1 = require('../models/assessment/CaseStudy');
var QuestionGroup_1 = require('../models/assessment/QuestionGroup');
var Question_1 = require('../models/assessment/Question');
var AssessmentHelper = (function () {
    function AssessmentHelper() {
    }
    ;
    AssessmentHelper.prototype.CreateAssessment = function (a) {
        return new Assessment_1.Assessment(a.ID, a.AssessmentType, a.Name, a.CaseStudies, this);
    };
    AssessmentHelper.prototype.CreateCaseStudy = function (c) {
        return new CaseStudy_1.CaseStudy(c.ID, c.DisplayOrder, c.Title, c.Description, c.QuestionGroups, this);
    };
    AssessmentHelper.prototype.CreateQuestionGroup = function (qg) {
        return new QuestionGroup_1.QuestionGroup(qg.ID, qg.DisplayOrder, qg.Title, qg.Description, qg.Questions, this);
    };
    AssessmentHelper.prototype.CreateQuestion = function (q) {
        return new Question_1.Question(q.ID, q.Text, q.DisplayOrder, q.Options, this);
    };
    AssessmentHelper.prototype.CreateOption = function (o) {
        return new QuestionOption(o.ID, o.DisplayOrder, o.Text, o.Value, o.IsSelected);
    };
    return AssessmentHelper;
}());
exports.AssessmentHelper = AssessmentHelper;

/// <reference path="../models/User.ts" />
var UserHelper = (function () {
    function UserHelper() {
    }
    ;
    UserHelper.prototype.CreateUser = function (u) {
        return new User(u.ID, u.Username, u.FirstName, u.LastName, u.Email, u.Telephone);
    };
    return UserHelper;
}());

/// <reference path="User.ts" />
/// <reference path="../helpers/UserHelper.ts" />
/// <reference path="../factories/UserFactory.ts" />
var ChatPost = (function () {
    function ChatPost(user, text, time) {
        this.User = user;
        this.Text = text;
        this.Time = time;
    }
    return ChatPost;
}());

/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="User.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
describe("Chat Posts", function () {
    var user;
    var userID;
    var username;
    var firstName;
    var lastName;
    var email;
    var telephone;
    var errorHandler; // Avoid dependencies
    var text;
    var time;
    var chatPost;
    beforeEach(function () {
        errorHandler = {
            AppModel: "test",
            Logger: new Logger(),
            Handle: (function (message) { })
        };
        userID = 1;
        username = "TestUserName";
        firstName = "Test";
        lastName = "User";
        email = "TestUser@example.org";
        telephone = "07812345671";
        user = new User(userID, username, firstName, lastName, email, telephone);
        text = "Test chat message";
        time = new Date();
        chatPost = new ChatPost(user, text, time);
    });
    it("should contain text", function () {
        expect(chatPost.Text).toEqual(text);
    });
    it("should contain a date and time", function () {
        expect(chatPost.Time).toEqual(time);
    });
    it("should contain a user", function () {
        expect(chatPost.User).toBeTruthy();
    });
    describe("User", function () {
        it("should contain an ID", function () {
            expect(chatPost.User.ID).toEqual(userID);
        });
        it("should contain a Username", function () {
            expect(chatPost.User.Username).toEqual(username);
        });
        it("should contain a first name", function () {
            expect(chatPost.User.FirstName).toEqual(firstName);
        });
        it("should contain a last name", function () {
            expect(chatPost.User.LastName).toEqual(lastName);
        });
        it("should contain an email", function () {
            expect(chatPost.User.Email).toEqual(email);
        });
        it("should contain a Username", function () {
            expect(chatPost.User.Telephone).toEqual(telephone);
        });
    });
});

"use strict";
(function (AssessmentType) {
    AssessmentType[AssessmentType["SJT"] = 1] = "SJT";
    AssessmentType[AssessmentType["BSQ"] = 2] = "BSQ";
})(exports.AssessmentType || (exports.AssessmentType = {}));
var AssessmentType = exports.AssessmentType;
(function (CultureCode) {
    CultureCode[CultureCode["en_GB"] = 1] = "en_GB";
    CultureCode[CultureCode["fr_FR"] = 2] = "fr_FR";
    CultureCode[CultureCode["de_DE"] = 3] = "de_DE";
    CultureCode[CultureCode["pt_BR"] = 4] = "pt_BR";
    CultureCode[CultureCode["es_ES"] = 5] = "es_ES";
})(exports.CultureCode || (exports.CultureCode = {}));
var CultureCode = exports.CultureCode;
(function (HttpVerb) {
    HttpVerb[HttpVerb["GET"] = 1] = "GET";
    HttpVerb[HttpVerb["POST"] = 2] = "POST";
})(exports.HttpVerb || (exports.HttpVerb = {}));
var HttpVerb = exports.HttpVerb;
(function (MenuItemLevel) {
    MenuItemLevel[MenuItemLevel["One"] = 1] = "One";
    MenuItemLevel[MenuItemLevel["Two"] = 2] = "Two";
})(exports.MenuItemLevel || (exports.MenuItemLevel = {}));
var MenuItemLevel = exports.MenuItemLevel;
(function (MessageDisplayStatus) {
    MessageDisplayStatus[MessageDisplayStatus["None"] = 1] = "None";
    MessageDisplayStatus[MessageDisplayStatus["Warning"] = 2] = "Warning";
    MessageDisplayStatus[MessageDisplayStatus["Error"] = 3] = "Error";
})(exports.MessageDisplayStatus || (exports.MessageDisplayStatus = {}));
var MessageDisplayStatus = exports.MessageDisplayStatus;
(function (TechnologyType) {
    TechnologyType[TechnologyType["Server"] = 1] = "Server";
    TechnologyType[TechnologyType["Database"] = 2] = "Database";
    TechnologyType[TechnologyType["FrontEnd"] = 3] = "FrontEnd";
})(exports.TechnologyType || (exports.TechnologyType = {}));
var TechnologyType = exports.TechnologyType;

/// <reference path="Logger.ts" />
/// <reference path="../../shared/models/Enums.ts" />
var ErrorHandler = (function () {
    function ErrorHandler(logger) {
        this.Logger = logger;
    }
    ErrorHandler.prototype.Handle = function (message) {
        this.Logger.Error(message);
    };
    return ErrorHandler;
}());

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
}());

/// <reference path="Enums.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
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
}());

/// <reference path="CaseStudy.ts" />
/// <reference path="../../models/Enums.ts" />
/// <reference path="../../helpers/AssessmentHelper.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
"use strict";
var Assessment = (function () {
    function Assessment(id, assessmentType, name, caseStudies, assessmentHelper) {
        var _this = this;
        this.ID = id;
        this.AssessmentType = assessmentType;
        this.Name = name;
        this.CaseStudies = new Array();
        caseStudies.forEach(function (x) { _this.CaseStudies.push(assessmentHelper.CreateCaseStudy(x)); });
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
}());
exports.Assessment = Assessment;

/// <reference path="QuestionGroup.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
"use strict";
var CaseStudy = (function () {
    function CaseStudy(id, displayOrder, title, description, questionGroups, assessmentHelper) {
        this.ID = id;
        this.DisplayOrder = displayOrder;
        this.Title = title;
        this.Description = description;
        this.QuestionGroups = new Array();
        for (var i = 0; i < questionGroups.length; i++) {
            var qg = questionGroups[i];
            this.QuestionGroups.push(assessmentHelper.CreateQuestionGroup(qg));
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
}());
exports.CaseStudy = CaseStudy;

var QuestionOption = (function () {
    function QuestionOption(id, order, text, value, selected) {
        this.ID = id;
        this.DisplayOrder = order;
        this.Text = text;
        this.Value = value;
        this.IsSelected = selected;
    }
    return QuestionOption;
}());

/// <reference path="Option.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
"use strict";
var Question = (function () {
    function Question(id, text, order, options, assessmentHelper) {
        var _this = this;
        this.ID = id;
        this.Text = text;
        this.DisplayOrder = order;
        this.Options = new Array();
        options.forEach(function (x) { _this.Options.push(assessmentHelper.CreateOption(x)); });
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
}());
exports.Question = Question;

/// <reference path="../../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../shared/models/assessment/Question.ts" />
/// <reference path="../../../shared/models/assessment/Option.ts" />
/// <reference path="../ErrorHandler.ts" />
"use strict";
var AssessmentHelper_1 = require('../../helpers/AssessmentHelper');
var Question_1 = require('./Question');
var GenerateOptions = function (quantity) {
    var options = new Array();
    for (var i = 0; i < quantity; i++) {
        var option = new QuestionOption(i, i, "Option " + i, i, false);
        options.push(option);
    }
    ;
    return options;
};
describe("Assessment", function () {
    describe("Question", function () {
        var numberOfOptions;
        var question;
        var id;
        var text;
        var displayOrder;
        var options;
        beforeEach(function () {
            id = 19328;
            text = "React is better than Angular. How much do you agree?";
            displayOrder = 1;
            numberOfOptions = 6;
            options = GenerateOptions(numberOfOptions);
            var appModel = null;
            var logger = null;
            var assessmentHelper = new AssessmentHelper_1.AssessmentHelper();
            question = new Question_1.Question(id, text, displayOrder, options, assessmentHelper);
        });
        it("should have the correct number of options", function () {
            expect(question.Options.length).toEqual(numberOfOptions);
        });
        it("should have properties correctly set by constructor", function () {
            expect(question.ID).toEqual(id);
            expect(question.DisplayOrder).toEqual(displayOrder);
            expect(question.Text).toEqual(text);
        });
    });
});

/// <reference path="Question.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
"use strict";
var QuestionGroup = (function () {
    function QuestionGroup(id, order, title, description, questions, assessmentHelper) {
        var _this = this;
        this.ID = id;
        this.DisplayOrder = order;
        this.Title = title;
        this.Description = description;
        // Create Questions array
        this.Questions = new Array();
        questions.forEach(function (x) { return _this.Questions.push(assessmentHelper.CreateQuestion(x)); });
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
}());
exports.QuestionGroup = QuestionGroup;

/// <reference path="../../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="Option.ts" />
describe("Assessment", function () {
    describe("Question Option", function () {
        var option;
        var id;
        var displayOrder;
        var text;
        var value;
        var isSelected;
        beforeEach(function () {
            id = 1;
            displayOrder = 3;
            text = "Test Option";
            value = 666;
            isSelected = false;
            option = new QuestionOption(id, displayOrder, text, value, isSelected);
        });
        it("should contain properties with correct values", function () {
            expect(option.ID).toEqual(id);
            expect(option.DisplayOrder).toEqual(displayOrder);
            expect(option.Text).toEqual(text);
            expect(option.Value).toEqual(value);
            expect(option.IsSelected).toEqual(isSelected);
        });
    });
});
