/// <reference path="Subscription.ts" />
/// <reference path="../Router.ts" />
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
        channel.push(new Subscription(context, func));
    };
    return Mediator;
}());
