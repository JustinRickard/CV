/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../resources/UiText.ts" />
/// <reference path="Router.ts" />
/// <reference path="../mediator/Mediator.ts" />
/// <reference path="../../shared/models/Enums.ts" />

var Model: AppModel;
var StaticText: IUiTextManager;
var UrlRouter: Router;
var MessageMediator: IMediator;

declare var Experience: IExperienceItem[];
declare var Jobs: IJobServerDto[];

$(document).ready(() => {
	var logger = new Logger();
    var errorHandler = new ErrorHandler(this, logger);

    // Set static text
    StaticText = new UiTextManager(CultureCode.en_GB);

    // Set the model data
    Model = new AppModel(Experience, Jobs, logger, errorHandler);
    Model.ApplyBindings(Model.MainPageId);

    // Initialise the # router
    Model.UrlRouter.Initialise();
});