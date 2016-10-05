/// <reference path="../ErrorHandler.ts" />
/// <reference path="../Page.ts" />
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
