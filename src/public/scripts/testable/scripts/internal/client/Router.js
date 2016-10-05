/// <reference path="../../../../DefinitelyTyped/routie/routie.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="AppModel.ts" />
/// <reference path="repositories/PageRepository.ts" />
/// <reference path="Enums.ts" />
var Router = (function () {
    function Router(pages) {
        this.Pages = pages;
    }
    Router.prototype.Initialise = function () {
        var routeData = this.GetRoutieData();
        routie(routeData);
    };
    Router.prototype.NavigateTo = function (url) {
        if (url === "/logout") {
            window.location.href = '/logout';
        }
        else {
            routie(url);
        }
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
