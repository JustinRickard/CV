/// <reference path="Page.ts" />
/// <reference path="Router.ts" />
/// <reference path="mediator/Mediator.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
// Let MenuItem know about the router
// declare var UrlRouter: Router;
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
