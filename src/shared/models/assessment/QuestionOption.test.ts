/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="Option.ts" />

describe("Assessment", () => {

	describe("Question Option", () => {

		var option: IQuestionOption;

		var id: number;
		var displayOrder: number;
		var text: string;
		var value: number;
		var isSelected: boolean;

		beforeEach(() => {
			id = 1;
			displayOrder = 3;
			text = "Test Option";
			value = 666;
			isSelected = false;

			option = new QuestionOption(id, displayOrder, text, value, isSelected);
		});

		it("should contain properties with correct values", () => {
			expect(option.ID).toEqual(id);
			expect(option.DisplayOrder).toEqual(displayOrder);
			expect(option.Text).toEqual(text);
			expect(option.Value).toEqual(value);
			expect(option.IsSelected).toEqual(isSelected);
		});
	});
});