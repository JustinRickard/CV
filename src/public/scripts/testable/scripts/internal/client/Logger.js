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
