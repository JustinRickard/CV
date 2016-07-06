/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../scripts/internal/client/assessment/Question.ts" />
/// <reference path="../../../scripts/internal/client/assessment/Option.ts" />
/// <reference path="../../../scripts/internal/client/ErrorHandler.ts" />
/// <reference path="helpers/QuestionSpecHelper.ts" />

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

		var helper = new QuestionSpecHelper();
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
			// options = helper.GenerateOptions(numberOfOptions);
			options = GenerateOptions(numberOfOptions);

			var appModel: any = null;
			var logger: any = null;
			var errorHandler = new ErrorHandler(appModel, logger);

			question = new Question(id, text, displayOrder, options, errorHandler);
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