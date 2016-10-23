/// <reference path="Question.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../typings/index.d.ts" />

import _ = require('lodash');
import { IQuestion, Question } from './Question';
import { IAssessmentHelper } from '../../helpers/AssessmentHelper';

export interface IQuestionGroup {
	ID: number;
	DisplayOrder: number;
	Title: string;
	Description: string; // This would be a description of the scenario
	Questions: IQuestion[];
	CurrentQuestion: IQuestion;
	CurrentQuestionIndex: number;
	PreviousQuestion(): void;
	NextQuestion(): void;
}

export class QuestionGroup implements IQuestionGroup {

	ID: number;
	DisplayOrder: number;
	Title: string;
	Description: string;
	Questions: IQuestion[];
	CurrentQuestion: IQuestion;
	CurrentQuestionIndex: number;

	constructor(id: number, order: number, title: string, description: string, 
		questions: IQuestion[], assessmentHelper: IAssessmentHelper) {
		this.ID = id;
		this.DisplayOrder = order;
		this.Title = title;
		this.Description = description;
		
		// Create Questions array
		this.Questions = new Array<Question>();
		questions.forEach((x) => this.Questions.push(assessmentHelper.CreateQuestion(x)));
		this.SortQuestions();

		if (this.Questions.length > 0)
		{
			this.CurrentQuestionIndex = 0;
			this.SetCurrentQuestion();
		}

	}

	public SortQuestions (): void {
		this.Questions = _.orderBy(this.Questions, ['DisplayOrder'], ['asc']);
	}


	public PreviousQuestion(): void {
		if (this.CurrentQuestionIndex > 0) {
			this.CurrentQuestionIndex--;
			this.SetCurrentQuestion();
		}
	}

	public NextQuestion(): void {
		if (this.CurrentQuestionIndex < this.Questions.length -1) {
			this.CurrentQuestionIndex++;
			this.SetCurrentQuestion;
		}
	}

	// PRIVATE METHODS
	private SetCurrentQuestion () {
		this.CurrentQuestion = this.Questions[this.CurrentQuestionIndex];
	}
}