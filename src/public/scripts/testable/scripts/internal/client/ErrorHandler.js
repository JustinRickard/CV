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
}());
