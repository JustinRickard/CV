/// <reference path="CaseStudy.ts" />
/// <reference path="../../models/Enums.ts" />
/// <reference path="../../helpers/AssessmentHelper.ts" />
/// <reference path="../../../../typings/index.d.ts" />

import _ = require('lodash');
import { AssessmentType } from '../../models/Enums';
import { IAssessmentHelper } from '../../helpers/AssessmentHelper';
import { ICaseStudy, CaseStudy } from './CaseStudy';
import { IQuestionGroup, QuestionGroup } from './QuestionGroup';
import { IQuestion, Question } from './Question';

export interface IAssessment {
	ID: number;
	AssessmentType: AssessmentType;
	Name: string;
	CaseStudies: ICaseStudy[];
	CurrentCaseStudy: ICaseStudy;
	CurrentCaseStudyIndex: number;
	InProgress: boolean;
	Submitting: boolean;
}

export class Assessment implements IAssessment {
	ID: number;
	AssessmentType: AssessmentType;
	Name: string;
	CaseStudies: ICaseStudy[];
	CurrentCaseStudy: ICaseStudy;
	CurrentCaseStudyIndex: number;
	InProgress: boolean;
	Submitting: boolean;

	constructor(id: number, assessmentType: AssessmentType, name: string, caseStudies: ICaseStudy[], assessmentHelper: IAssessmentHelper) {
		this.ID = id;
		this.AssessmentType = assessmentType;
		this.Name = name;

		this.CaseStudies = new Array<ICaseStudy>();
		caseStudies.forEach((x) => { this.CaseStudies.push(assessmentHelper.CreateCaseStudy(x)) });
		this.SortCaseStudies();

		if (this.CaseStudies.length > 0) {
			this.CurrentCaseStudyIndex = 0;
			this.SetCurrentCaseStudy();
		}

		this.InProgress = false;
		this.Submitting = false;
	}

	public SortCaseStudies(): void {
		this.CaseStudies = _.orderBy(this.CaseStudies, ['DisplayOrder'], ['asc']);
	}

	public PreviousCaseStudy(): void {
		if (this.CurrentCaseStudyIndex > 0) {
			this.CurrentCaseStudyIndex--;
			this.SetCurrentCaseStudy();
		}
	}

	public NextCaseStudy(): void {
		if (this.CurrentCaseStudyIndex < this.CaseStudies.length - 1) {
			this.CurrentCaseStudyIndex++;
			this.SetCurrentCaseStudy();
		}
	}

	public Start() {
		this.InProgress = true;
	}

	public Submit() {
		this.InProgress = false;
		this.Submitting = true;
	}

	public Previous() {
		var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;

		if (currentQuestionIndex > 0) {
			// The user is not on the first question of the group
			this.CurrentCaseStudy.CurrentQuestionGroup.PreviousQuestion();
		} else {
			// The user is on the first question of the group
			var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
			
			if (currentQuestionGroupIndex > 0)
			{
				// The user is not on the first question group
				this.CurrentCaseStudy.PreviousQuestionGroup();
			} else {
				// The user is not on the last question group of the case study
				var currentCaseStudyIndex = this.CurrentCaseStudyIndex;

				if (currentCaseStudyIndex > 0) {
					// The user is not on the last case study
					this.PreviousCaseStudy();
				} else {
					// TODO: Show message that the user is at the start.
				}
			}
		}
	}

	public Next() {

		var currentQuestionIndex = this.CurrentCaseStudy.CurrentQuestionGroup.CurrentQuestionIndex;
		var currentQuestionGroupLength = this.CurrentCaseStudy.CurrentQuestionGroup.Questions.length;

		if (currentQuestionIndex < currentQuestionGroupLength -1) {
			// The user is not on the last question of the group
			this.CurrentCaseStudy.CurrentQuestionGroup.NextQuestion();
		} else {
			// The user is on the last question of the group (and the last question)
			var currentQuestionGroupIndex = this.CurrentCaseStudy.CurrentQuestionGroupIndex;
			var currentCaseStudyLength = this.CurrentCaseStudy.QuestionGroups.length;

			if (currentQuestionGroupIndex < currentCaseStudyLength -1) {
				// The user is not on the last question group in the case study (and is on the last question)
				this.CurrentCaseStudy.NextQuestionGroup();
			} else {
				// The user is on the last question group in the case study (and is on the last question)
				var currentCaseStudyIndex = this.CurrentCaseStudyIndex;
				var currentAssessmentLength = this.CaseStudies.length;

				if (currentCaseStudyIndex < currentAssessmentLength -1) {
					this.NextCaseStudy();
				} else {
					// The user is on the last case study (and the last question, and last question group)
					this.Submit();
				}
			}
		}
	}

	// PRIVATE METHODS
	private SetCurrentCaseStudy () {
		this.CurrentCaseStudy = this.CaseStudies[this.CurrentCaseStudyIndex];
	}
}