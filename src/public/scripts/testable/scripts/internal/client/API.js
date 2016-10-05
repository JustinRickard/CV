/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
var LiveApi = (function () {
    function LiveApi(errorHandler, logger) {
        this.Utils = new Utilities(errorHandler);
        this.Logger = logger;
        this.ErrorHandler = errorHandler;
    }
    LiveApi.prototype.GetAllData = function () {
        var data = this.Utils.Get("GetAll");
        if (data) {
            var appModel = new AppModel(this, data.User, data.Users, data.Jobs, data.TimelineEras, data.Assessments, data.ChatPosts, data.MessageStatus, data.CurrentMessage, this.Logger, this.ErrorHandler);
            return appModel;
        }
        return null;
    };
    LiveApi.prototype.Login = function (username, password) {
    };
    LiveApi.prototype.Logout = function () {
    };
    return LiveApi;
}());
