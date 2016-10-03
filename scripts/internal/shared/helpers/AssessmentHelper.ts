/// <reference path="../models/assessment/Assessment.ts" />

interface IAssessmentHelper {
	CreateAssessment(u: IAssessment): IAssessment;
	CreateCaseStudy(c: ICaseStudy): ICaseStudy;
	CreateQuestionGroup(qg: IQuestionGroup): IQuestionGroup;
	CreateQuestion(q: IQuestion): IQuestion;
	CreateOption(o: IQuestionOption): IQuestionOption;
}

class AssessmentHelper implements IAssessmentHelper {

	constructor(){};

	public CreateAssessment(a: IAssessment): Assessment {
		return new Assessment(a.ID, a.AssessmentType, a.Name, a.CaseStudies, this);
	}

	public CreateCaseStudy(c: ICaseStudy): CaseStudy {
		return new CaseStudy(c.ID, c.DisplayOrder, c.Title, c.Description, c.QuestionGroups, this);
	}

	public CreateQuestionGroup(qg: IQuestionGroup): QuestionGroup {
		return new QuestionGroup(qg.ID, qg.DisplayOrder, qg.Title, qg.Description,
			qg.Questions, this);
	}

	public CreateQuestion(q: IQuestion): Question {
		return new Question(q.ID, q.Text, q.DisplayOrder, q.Options, this);
	}

	public CreateOption(o: IQuestionOption) {
		return new QuestionOption(o.ID, o.DisplayOrder, o.Text, o.Value, o.IsSelected)
	}
}