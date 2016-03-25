/// <reference path="CaseStudy.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />
var Assessment = (function () {
    function Assessment(id, assessmentType, name, caseStudies, errorHandler) {
        var _this = this;
        var utils = new Utilities(errorHandler);
        this.ID = id;
        this.AssessmentType = assessmentType;
        this.Name = name;
        this.CaseStudies = new Array();
        caseStudies.forEach(function (x) { _this.CaseStudies.push(utils.CreateCaseStudy(x)); });
        this.SortCaseStudies();
        if (this.CaseStudies.length > 0) {
            this.CurrentCaseStudyIndex = 0;
            this.SetCurrentCaseStudy();
        }
        this.InProgress = false;
        this.Submitting = false;
    }
    Assessment.prototype.SortCaseStudies = function () {
        this.CaseStudies = _.orderBy(this.CaseStudies, ['DisplayOrder'], ['asc']);
    };
    Assessment.prototype.PreviousCaseStudy = function () {
        if (this.CurrentCaseStudyIndex > 0) {
            this.CurrentCaseStudyIndex--;
            this.SetCurrentCaseStudy();
        }
    };
    Assessment.prototype.NextCaseStudy = function () {
        if (this.CurrentCaseStudyIndex < this.CaseStudies.length - 1) {
            this.CurrentCaseStudyIndex++;
            this.SetCurrentCaseStudy();
        }
    };
    Assessment.prototype.Start = function () {
        this.InProgress = true;
    };
    Assessment.prototype.Submit = function () {
        this.InProgress = false;
        this.Submitting = true;
    };
    Assessment.prototype.Previous = function () {
        var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;
        if (currentQuestionIndex > 0) {
            // The user is not on the first question of the group
            this.CurrentCaseStudy.CurrentQuestionGroup.PreviousQuestion();
        }
        else {
            // The user is on the first question of the group
            var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
            if (currentQuestionGroupIndex > 0) {
                // The user is not on the first question group
                this.CurrentCaseStudy.PreviousQuestionGroup();
            }
            else {
                // The user is not on the last question group of the case study
                var currentCaseStudyIndex = this.CurrentCaseStudyIndex;
                if (currentCaseStudyIndex > 0) {
                    // The user is not on the last case study
                    this.PreviousCaseStudy();
                }
                else {
                }
            }
        }
    };
    Assessment.prototype.Next = function () {
        var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;
        var currentQuestionGroupLength = this.CurrentCaseStudy.CurrentQuestionGroup.Questions.length;
        if (currentQuestionIndex < currentQuestionGroupLength - 1) {
            // The user is not on the last question of the group
            this.CurrentCaseStudy.CurrentQuestionGroup.NextQuestion();
        }
        else {
            // The user is on the last question of the group (and the last question)
            var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
            var currentCaseStudyLength = this.CurrentCaseStudy.QuestionGroups.length;
            if (currentQuestionGroupIndex < currentCaseStudyLength - 1) {
                // The user is not on the last question group in the case study (and is on the last question)
                this.CurrentCaseStudy.NextQuestionGroup();
            }
            else {
                // The user is on the last question group in the case study (and is on the last question)
                var currentCaseStudyIndex = this.CurrentCaseStudyIndex;
                var currentAssessmentLength = this.CaseStudies.length;
                if (currentCaseStudyIndex < currentAssessmentLength - 1) {
                    this.NextCaseStudy();
                }
                else {
                    // The user is on the last case study (and the last question, and last question group)
                    this.Submit();
                }
            }
        }
    };
    // PRIVATE METHODS
    Assessment.prototype.SetCurrentCaseStudy = function () {
        this.CurrentCaseStudy = this.CaseStudies[this.CurrentCaseStudyIndex];
    };
    return Assessment;
})();
