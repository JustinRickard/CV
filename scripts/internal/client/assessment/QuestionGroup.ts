/// <reference path="Question.ts" />
/// <reference path="../Utilities.ts" />
/// <reference path="../../../../../DefinitelyTyped/lodash/lodash.d.ts" />

interface IQuestionGroup {
	ID: number;
	DisplayOrder: number;
	Title: string;
	Description: string; // This would be a description of the scenario
	Questions: IQuestion[];
	PreviousQuestion(): void;
	NextQuestion(): void;
}

class QuestionGroup implements IQuestionGroup {

	ID: number;
	DisplayOrder: number;
	Title: string;
	Description: string;
	Questions: Question[];
	CurrentQuestion: Question;
	CurrentQuestionIndex: number;

	constructor(id: number, order: number, title: string, description: string, 
		questions: IQuestion[], errorHandler: IErrorHandler) {
		var utils = new Utilities(errorHandler);
		this.ID = id;
		this.DisplayOrder = order;
		this.Title = title;
		this.Description = description;
		
		// Create Questions array
		this.Questions = new Array<Question>();
		questions.forEach((x) => this.Questions.push(utils.CreateQuestion(x)));
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