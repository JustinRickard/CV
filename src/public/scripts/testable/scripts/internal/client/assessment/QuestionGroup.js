/// <reference path="Question.ts" />
/// <reference path="../Utilities.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />
var QuestionGroup = (function () {
    function QuestionGroup(id, order, title, description, questions, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.DisplayOrder = order;
        this.Title = title;
        this.Description = description;
        // Create Questions array
        this.Questions = new Array();
        questions.forEach(function (x) { return _this.Questions.push(utils.CreateQuestion(x)); });
        this.SortQuestions();
        if (this.Questions.length > 0) {
            this.CurrentQuestionIndex = 0;
            this.SetCurrentQuestion();
        }
    }
    QuestionGroup.prototype.SortQuestions = function () {
        this.Questions = _.orderBy(this.Questions, ['DisplayOrder'], ['asc']);
    };
    QuestionGroup.prototype.PreviousQuestion = function () {
        if (this.CurrentQuestionIndex > 0) {
            this.CurrentQuestionIndex--;
            this.SetCurrentQuestion();
        }
    };
    QuestionGroup.prototype.NextQuestion = function () {
        if (this.CurrentQuestionIndex < this.Questions.length - 1) {
            this.CurrentQuestionIndex++;
            this.SetCurrentQuestion;
        }
    };
    // PRIVATE METHODS
    QuestionGroup.prototype.SetCurrentQuestion = function () {
        this.CurrentQuestion = this.Questions[this.CurrentQuestionIndex];
    };
    return QuestionGroup;
}());
