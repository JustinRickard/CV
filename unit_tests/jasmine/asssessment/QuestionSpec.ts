/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../scripts/internal/shared/models/assessment/Question.ts" />
/// <reference path="../../../scripts/internal/shared/models/assessment/Option.ts" />
/// <reference path="../../../scripts/internal/client/ErrorHandler.ts" />

var GenerateOptions =  function(quantity)  {
		var options = new Array<QuestionOption>();

		for (var i = 0; i < quantity; i++) {
			var option = new QuestionOption(i, i, "Option " + i, i, false);
			options.push(option);
		};

		return options;
};

describe("Assessment", () => {

	describe("Question", () => {

		var numberOfOptions: number;

		var question: IQuestion;
		
		var id: number;
		var text: string;
		var displayOrder: number;
		var options: Array<IQuestionOption>;

		beforeEach(() => {

			id = 19328;
			text = "React is better than Angular. How much do you agree?";
			displayOrder = 1;

			numberOfOptions = 6
			options = GenerateOptions(numberOfOptions);

			var appModel: any = null;
			var logger: any = null;
			var assessmentHelper = new AssessmentHelper();

			question = new Question(id, text, displayOrder, options, assessmentHelper);
		});

		it ("should have the correct number of options", () => { 
			expect(question.Options.length).toEqual(numberOfOptions);
		});

		it ("should have properties correctly set by constructor", () => {
			expect(question.ID).toEqual(id);
			expect(question.DisplayOrder).toEqual(displayOrder);
			expect(question.Text).toEqual(text);
		});

	});
});