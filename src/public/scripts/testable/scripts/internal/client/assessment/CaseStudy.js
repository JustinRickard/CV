/// <reference path="QuestionGroup.ts" />
/// <reference path="../Utilities.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
var CaseStudy = (function () {
    function CaseStudy(id, displayOrder, title, description, questionGroups, errorHandler) {
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.DisplayOrder = displayOrder;
        this.Title = title;
        this.Description = description;
        this.QuestionGroups = new Array();
        for (var i = 0; i < questionGroups.length; i++) {
            var qg = questionGroups[i];
            this.QuestionGroups.push(utils.CreateQuestionGroup(qg));
        }
        this.SortQuestionGroups();
        if (this.QuestionGroups.length > 0) {
            this.CurrentQuestionGroupIndex = 0;
            this.SetCurrentQuestionGroup();
        }
    }
    CaseStudy.prototype.SortQuestionGroups = function () {
        this.QuestionGroups = _.orderBy(this.QuestionGroups, ['DisplayOrder'], ['asc']);
    };
    CaseStudy.prototype.PreviousQuestionGroup = function () {
        if (this.CurrentQuestionGroupIndex > 0) {
            this.CurrentQuestionGroupIndex--;
            this.SetCurrentQuestionGroup();
        }
    };
    CaseStudy.prototype.NextQuestionGroup = function () {
        if (this.CurrentQuestionGroupIndex < this.QuestionGroups.length - 1) {
            this.CurrentQuestionGroupIndex++;
            this.SetCurrentQuestionGroup();
        }
    };
    // PRIVATE METHODS
    CaseStudy.prototype.SetCurrentQuestionGroup = function () {
        this.CurrentQuestionGroup = this.QuestionGroups[this.CurrentQuestionGroupIndex];
    };
    return CaseStudy;
}());
