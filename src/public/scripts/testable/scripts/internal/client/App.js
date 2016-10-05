/// <reference path="AppModel.ts" />
/// <reference path="API.ts" />
/// <reference path="StubAPI.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="UiText.ts" />
/// <reference path="Router.ts" />
/// <reference path="mediator/Mediator.ts" />
/// <reference path="Enums.ts" />
var _this = this;
var Model;
var StaticText;
var UrlRouter;
var MessageMediator;
$(document).ready(function () {
    var logger = new Logger();
    var errorHandler = new ErrorHandler(_this, logger);
    var utils = new Utilities(errorHandler);
    // Set the API class to use (Live or Stub)
    // var api = new LiveApi(errorHandler, logger);
    var api = new StubApi(errorHandler, logger);
    // Set static text
    StaticText = new UiTextManager(CultureCode.en_GB);
    // Set the model data
    Model = api.GetAllData();
});
