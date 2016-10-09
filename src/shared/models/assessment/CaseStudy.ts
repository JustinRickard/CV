/// <reference path="QuestionGroup.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />

import { IAssessmentHelper } from '../../helpers/AssessmentHelper';
import { IQuestionGroup, QuestionGroup } from './QuestionGroup';
import { IQuestion, Question } from './Question';

export interface ICaseStudy {
	ID: number;
	DisplayOrder: number;
	Title: string;  // A section of the assessment, eg At a call centre, at the olympics.
	Description: string;  // Details and instructions on the case study. Shown before questions start.
	QuestionGroups: IQuestionGroup[];
	CurrentQuestionGroup: IQuestionGroup;
	CurrentQuestionGroupIndex: number;
	IsDescriptionVisible: boolean;
	PreviousQuestionGroup(): void;
	NextQuestionGroup(): void;
}

export class CaseStudy implements ICaseStudy {
	ID: number;
	DisplayOrder: number;
	Title: string;
	Description: string;
	QuestionGroups: IQuestionGroup[];
	CurrentQuestionGroup: IQuestionGroup;
	CurrentQuestionGroupIndex: number;
	IsDescriptionVisible: boolean;

	constructor(id: number, displayOrder: number, title: string, 
		description: string, questionGroups: IQuestionGroup[], assessmentHelper: IAssessmentHelper) {
		this.ID = id;
		this.DisplayOrder = displayOrder;
		this.Title = title;
		this.Description = description;

		this.QuestionGroups = new Array<QuestionGroup>();
		for (var i = 0; i < questionGroups.length; i++) {
			var qg = questionGroups[i];
				this.QuestionGroups.push(assessmentHelper.CreateQuestionGroup(qg));
		}
		this.SortQuestionGroups();

		if (this.QuestionGroups.length > 0) {
			this.CurrentQuestionGroupIndex = 0;
			this.SetCurrentQuestionGroup();
		}
	}

	private SortQuestionGroups(): void {
		this.QuestionGroups = _.orderBy(this.QuestionGroups, ['DisplayOrder'], ['asc']);
	}

	public PreviousQuestionGroup(): void {
		if (this.CurrentQuestionGroupIndex > 0) {
			this.CurrentQuestionGroupIndex--;
			this.SetCurrentQuestionGroup();
		}
	}

	public NextQuestionGroup(): void {
		if (this.CurrentQuestionGroupIndex < this.QuestionGroups.length - 1) {
			this.CurrentQuestionGroupIndex++;
			this.SetCurrentQuestionGroup();
		}
	}

	// PRIVATE METHODS
	private SetCurrentQuestionGroup () {
		this.CurrentQuestionGroup = this.QuestionGroups[this.CurrentQuestionGroupIndex];
	}
}