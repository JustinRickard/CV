/// <reference path="Option.ts" />
/// <reference path="../../../shared/helpers/AssessmentHelper.ts" />
/// <reference path="../../../../typings/index.d.ts" />

import _ = require('lodash');
import { IAssessmentHelper } from '../../helpers/AssessmentHelper';

export interface IQuestion {
	ID: number;
	Text: string;
	DisplayOrder: number;
	Options: IQuestionOption[];
	SelectOption(id: number): void;
}

export class Question implements IQuestion {
	ID: number;
	Text: string;
	DisplayOrder: number;
	Options: QuestionOption[];

	constructor(id: number, text: string, order: number, options: IQuestionOption[], assessmentHelper: IAssessmentHelper) {
		this.ID = id;
		this.Text = text;
		this.DisplayOrder = order;
		
		this.Options = new Array<QuestionOption>();
		options.forEach((x) => { this.Options.push(assessmentHelper.CreateOption(x)) });

	}

	public SelectOption (optionId: number): void {

		// Set all options as unselected
		this.Options.forEach((x) => { x.IsSelected = false });

		// Set the chosen option as selected
		var option = _.find(this.Options, (x) => { x.ID === optionId });
		if (option) {
			option.IsSelected = true;
		} else {
			console.log("Error: Option with ID " + optionId + " was selected, but this does not exist.");
		}
	}
}