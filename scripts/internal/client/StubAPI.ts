/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="API.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />

// Stub API to return dummy data
class StubApi {

	Utils: Utilities;
	Logger: ILogger;
	ErrorHandler: IErrorHandler;

	constructor(errorHandler: IErrorHandler, logger: ILogger) {
		this.Utils = new Utilities(errorHandler);
		this.Logger = logger;
		this.ErrorHandler = errorHandler;

	}

	public GetAllData(): AppModel {

		var user = this.GenerateUser(1066, "JustinR86", "Justin", "Rickard", "justinr86.jr@gmail.com", "07712334445");
		var users = this.GenerateUsers(4);
		var appModel = new AppModel(

			this, user, users, this.GenerateJobs(), this.GenerateAssessments(4),
			this.GenerateChatPosts(users), MessageDisplayStatus.None, "",
			this.Logger, this.ErrorHandler);

		return appModel;

	}

	public Login(username: string, password: string): void {

	}

	public Logout(): void {

	}

	// PRIVATE METHODS

	private GenerateChatPosts(users: IUser[]): IChatPost[] {
		// return post data
		var posts: IChatPost[] = [
			{
				Time: new Date(2014, 9, 17, 9, 0, 0, 0),
				UserID: 0,
				Text: "Post content 4"
			},
			{
				Time: new Date(2008, 8, 4, 9, 0, 0, 0),
				UserID: 1,
				Text: "Post content 1"
			},
			{
				Time: new Date(2012, 9, 20, 9, 0, 0, 0),
				UserID: 2,
				Text: "Post content 2"
			},
			{
				Time: new Date(2013, 6, 1, 9, 0, 0, 0),
				UserID: 3,
				Text: "Post content 3"
			}
		];

		return posts;
	}

	private GenerateUser(id: number, username: string, firstName: string, lastName: string, email: string, tel: string): User {
		return new User(id, username, firstName, lastName, email, tel);
	}

	private GenerateUsers(quantity: number) {
		var users = new Array<User>();

		for (var i = 0; i < quantity; i++) {
			var user = new User(i, "User" + i, "Forename" + i, "Surname" + i, i + "@example.org", "077 " + i + " 998877");
			users.push(user);
		};

		return users;
	}

	private GenerateJobs(): Array<Job> {
		var jobs = new Array<Job>();

		var dates = [
			new Date(2008, 8, 4, 9, 0, 0, 0),
			new Date(2012, 9, 20, 9, 0, 0, 0),
			new Date(2013, 6, 1, 9, 0, 0, 0),
			new Date(2014, 9, 17, 9, 0, 0, 0),
			null
		];

		for (var i = 0; i < 4; i++) {
			var job = new Job("Job" + i, dates[i], dates[i + 1], false);
			jobs.push(job);
		};

		return jobs;
	}

	private GenerateOptions(quantity: number): Array<QuestionOption> {

		var options = new Array<QuestionOption>();

		for (var i = 0; i < quantity; i++) {
			var option = new QuestionOption(i, i, "Option " + i, i, false);
			options.push(option);
		};

		return options;
	}

	private GenerateQuestions(quantity: number): Array<Question> {

		var questions = new Array<Question>();

		for (var i = 0; i < quantity; i++) {
			var question = new Question(i, "Question " + i, i, this.GenerateOptions(quantity), this.ErrorHandler);
			questions.push(question);
		};

		return questions;
	}

	private GenerateQuestionGroups(quantity: number): Array<QuestionGroup> {

		var groups = new Array<QuestionGroup>();

		for (var i = 0; i < quantity; i++) {
			var group = new QuestionGroup(i, i, "Question Group " + i, "Description for group " + i, this.GenerateQuestions(quantity), this.ErrorHandler);
			groups.push(group);
		};

		return groups;
	}

	private GenerateCaseStudies(quantity: number): Array<CaseStudy> {
		var caseStudies = new Array<CaseStudy>();

		for (var i = 0; i < quantity; i++) {
			var caseStudy = new CaseStudy(i, i, "CaseStudy " + i, "Description for caseStudy " + i, this.GenerateQuestionGroups(quantity), this.ErrorHandler);
			caseStudies.push(caseStudy);
		};

		return caseStudies;
	}

	private GenerateAssessments(quantity: number): Array<Assessment> {
		var assessments = new Array<Assessment>();

		for (var i = 0; i < quantity; i++) {
			var assessment = new Assessment(i, AssessmentType.SJT, "Assessment " + i, this.GenerateCaseStudies(quantity), this.ErrorHandler);
			assessments.push(assessment);
		};

		return assessments;
	}
}