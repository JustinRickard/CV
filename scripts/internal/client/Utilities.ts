/// <reference path="User.ts" />
/// <reference path="Job.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="CaseStudy.ts" />
/// <reference path="QuestionGroup.ts" />
/// <reference path="Question.ts" />
/// <reference path="Option.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="Enums.ts" />
/// <reference path="timeline/TimelineSlide.ts" />
/// <reference path="timeline/TimelineDate.ts" />
/// <reference path="timeline/TimelineEra.ts" />
/// <reference path="timeline/TimelineEvent.ts" />
/// <reference path="timeline/TimelineMedia.ts" />
/// <reference path="timeline/TimelineText.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />

class Utilities {

	ErrorHandler: IErrorHandler;

	constructor(errorHandler: IErrorHandler)
	{
		this.ErrorHandler = errorHandler;
	}

	// DATA ACCESS METHODS
	public Get(url: string): any {
		return this.CallServer(HttpVerb.GET, url, null);
	}

	public Post(url: string, postData: any): void {
		return this.CallServer(HttpVerb.POST, url, postData);
	}

	public CallServer(httpVerb: HttpVerb, url: string, postData: any) {
		var verb: string;
		switch (httpVerb) {
			case HttpVerb.GET:
				$.ajax({
					url: url,
					type: 'GET',
					success: ((data) => {
						return data;
					}),
					error: ((jq, status, message)  => {
						this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while getting data from the server. Status: " + status + ' - Message: ' + message);
						return null
					}),
					dataType: 'json'
				});
				break;

			default:
				$.ajax({
					url: url,
					type: 'POST',
					success: ((data) => {
						return data;
					}),
					error: ((jq, status, message) => {
						this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while posting data to the server. Status: " + status + ' - Message: ' + message);
						return null;
					}),
					dataType: 'json'
				});
				break;
		}
	}

	// VALIDATION METHODS
	public EmailIsValid(email: string): boolean {
		var pattern = /.*@.*[.].*/g;
		var found = email.match(pattern);
		if (!found) {
			return false
		}
		return true;
	}

	// CREATE METHODS (FROM INTERFACE)
	public CreateJob(j: IJob): Job {
		return new Job(j.Company, j.Description, j.Start, j.End, j.IsCurrent, j.ImageUrl);
	}

	public CreateTimelineSlide(j: IJob, utils: Utilities): TimelineSlide {
		var timelineText = new TimelineText(j.Company, j.Description);
		var timelineMedia = new TimelineMedia(j.ImageUrl, "");
		return new TimelineSlide(j.Start, j.End, timelineText, timelineMedia, utils);
	}

	public CreateTimelineEra(e: ITimelineEra) {
		return new TimelineEra(e.start_date, e.end_date, e.text);
	}

	public CreateUser(u: IUser): User {
		return new User(u.ID, u.Username, u.FirstName, u.LastName, u.Email, u.Telephone);
	}

	public CreateAssessment(a: IAssessment): Assessment {
		return new Assessment(a.ID, a.AssessmentType, a.Name, a.CaseStudies, this.ErrorHandler);
	}

	public CreateChatPost(c: IChatPost, user: User): ChatPost {
		return new ChatPost(user, c.Text, c.Time, this.ErrorHandler);
	}

	public CreateCaseStudy (cs: ICaseStudy): CaseStudy {
		return new CaseStudy(cs.ID, cs.DisplayOrder, cs.Title, cs.Description, cs.QuestionGroups, this.ErrorHandler);
	}

	public CreateQuestionGroup (qg: IQuestionGroup): QuestionGroup {
		return new QuestionGroup(qg.ID, qg.DisplayOrder, qg.Title, qg.Description, qg.Questions, this.ErrorHandler);
	}

	public CreateQuestion (q: IQuestion): Question {
		return new Question(q.ID, q.Text, q.DisplayOrder, q.Options, this.ErrorHandler);
	}

	public CreateOption (o: IQuestionOption): QuestionOption {
		return new QuestionOption(o.ID, o.DisplayOrder, o.Text, o.Value, o.IsSelected);
	}

	// Data manipulation
	public DateToString(date: Date): string {
		var day = this.To2Figures(date.getDate().toString());
		var month = this.To2Figures(date.getMonth().toString());

		return date.getFullYear() + "," + month + "," + day;
	}

	public To2Figures (numberAsString: string): string {
		if (numberAsString.length === 1)
		{
			numberAsString = "0" + numberAsString;
		}
		return numberAsString;
	}

	public GetTimelineDate(date: Date): TimelineDate {
		if (!date) return null;
		return new TimelineDate(date.getFullYear(), date.getMonth());
	}
}