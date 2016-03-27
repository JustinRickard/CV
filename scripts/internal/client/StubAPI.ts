/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="API.ts" />
/// <reference path="timeline/TimelineEra.ts" />
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

			this, user, users, this.GenerateJobs(), this.GenerateEras(),
			this.GenerateAssessments(4), this.GenerateChatPosts(users),
			MessageDisplayStatus.None, "", this.Logger, this.ErrorHandler);

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

		var uni_start = new Date(2005, 8, 1);
		var uni_headline = "Loughborough University";
		var uni_title = "Computer Science (BSc)";
		var uni_imageUrl = "images/loughborough_university.jpg";

		var fidessa1_start = new Date(2008, 8, 1);
		var fidessa1_headline = "Fidessa";
		var fidessa1_title = "Trading Platform Engineer";
		var fidessa1_imageUrl = "images/fidessa.jpg";

		var fidessa2_start = new Date(2012, 8, 1);
		var fidessa2_headline = "Fidessa";
		var fidessa2_title = "FIX Connectivity Engineer";
		var fidessa2_imageUrl = "images/fidessa.jpg";

		var accesso_start = new Date(2013, 5, 1);
		var accesso_headline = "Fidessa";
		var accesso_title = "Software Developer";
		var accesso_imageUrl = "images/accesso.png";

		var adc_start = new Date(2014, 8, 1);
		var adc_headline = "a&dc";
		var adc_title = "Software Developer";
		var adc_imageUrl = "images/adc.jpg";

		var uni = new Job(uni_headline, uni_title, uni_start, fidessa1_start, false, uni_imageUrl);
		var fid1 = new Job(fidessa1_headline, fidessa1_title, fidessa1_start, fidessa2_start, false, fidessa1_imageUrl);
		var fid2 = new Job(fidessa2_headline, fidessa2_title, fidessa2_start, accesso_start, false, fidessa2_imageUrl);
		var accesso = new Job(accesso_headline, accesso_title, accesso_start, adc_start, false, accesso_imageUrl);
		var adc = new Job(adc_headline, adc_title, adc_start, new Date(), false, adc_imageUrl);

		jobs.push(uni);
		jobs.push(fid1);
		jobs.push(fid2);
		jobs.push(accesso);
		jobs.push(adc);
		
		return jobs;
	}

	private GenerateEras(): Array<TimelineEra> {
		var eras = new Array<TimelineEra> ();

		// Education
		var education_start = new Date(2005, 9, 1, 9, 0, 0, 0);
		var edu_start = this.Utils.GetTimelineDate(education_start);
		var education_end   = new Date(2008, 8, 4, 9, 0, 0, 0);
		var edu_end = this.Utils.GetTimelineDate(education_end);
		var edu_text = new TimelineText("University","3 years studying Computer Science at Loughborough University");
		
		var education = new TimelineEra(edu_start, edu_end, edu_text);

		// Financial

		var financial_start = new Date(2008, 8, 4, 9, 0, 0, 0);
		var fin_start = this.Utils.GetTimelineDate(financial_start);
		var financial_end   = new Date(2013, 6, 1, 9, 0, 0, 0);
		var fin_end = this.Utils.GetTimelineDate(financial_end);
		var fin_text = new TimelineText("Financial Software","Over 4 years as an implementation engineer.");
		var financial = new TimelineEra(fin_start, fin_end, fin_text);
		// Development
		var developer_start = new Date(2013, 6, 1, 9, 0, 0, 0);
		var dev_start = this.Utils.GetTimelineDate(developer_start);
		var dev_end = this.Utils.GetTimelineDate(new Date());
		var dev_text = new TimelineText("Software Development","Software Developer since summer 2013");
		var development = new TimelineEra(dev_start, dev_end, dev_text);

		eras.push(education);
		eras.push(financial);
		eras.push(development);

		return eras;
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