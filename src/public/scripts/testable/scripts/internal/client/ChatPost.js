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
}());
