/// <reference path="Utilities.ts" />

interface IQuestionOption {
	ID: number;
	DisplayOrder: number;
	Text: string;
	Value: number;
	IsSelected: boolean;
}

class QuestionOption implements IQuestionOption {
	ID: number;
	DisplayOrder: number;
	Text: string;
	Value: number;
	IsSelected: boolean;

	constructor (id: number, order: number, text: string, value: number, selected: boolean) {
		this.ID = id;
		this.DisplayOrder = order;
		this.Text = text;
		this.Value = value;
		this.IsSelected = selected;
	}
}