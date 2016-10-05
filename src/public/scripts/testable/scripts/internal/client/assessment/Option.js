/// <reference path="../Utilities.ts" />
var QuestionOption = (function () {
    function QuestionOption(id, order, text, value, selected) {
        this.ID = id;
        this.DisplayOrder = order;
        this.Text = text;
        this.Value = value;
        this.IsSelected = selected;
    }
    return QuestionOption;
}());
