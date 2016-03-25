/// <reference path="Option.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
var Question = (function () {
    function Question(id, text, order, options, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.Text = text;
        this.DisplayOrder = order;
        this.Options = new Array();
        options.forEach(function (x) { _this.Options.push(utils.CreateOption(x)); });
    }
    Question.prototype.SelectOption = function (optionId) {
        // Set all options as unselected
        this.Options.forEach(function (x) { x.IsSelected = false; });
        // Set the chosen option as selected
        var option = _.find(this.Options, function (x) { x.ID === optionId; });
        if (option) {
            option.IsSelected = true;
        }
        else {
            console.log("Error: Option with ID " + optionId + " was selected, but this does not exist.");
        }
    };
    return Question;
})();
