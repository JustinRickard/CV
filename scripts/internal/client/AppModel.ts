/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="timeline/Timeline.ts" />
/// <reference path="timeline/TimelineSlide.ts" />
/// <reference path="timeline/TimelineEra.ts" />
/// <reference path="../../../partials/generated/home.ts" />
/// <reference path="../../../partials/generated/about.ts" />
/// <reference path="../../../partials/generated/career.ts" />
/// <reference path="../../../partials/generated/programming_csharp.ts" />
/// <reference path="../../../partials/generated/programming_typescript.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/timelinejs/timelinejs.d.ts" />

interface IAppModel {
	Api: IApi;
	User: IUser;
	Users: IUser[];
	Jobs: IJob[];
	TimelineEras: ITimelineEra[];
	Assessments: IAssessment[];
	ChatPosts: IChatPost[];
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	SetMessage(messageStatus: MessageDisplayStatus, message: string): void;
	ClearMessage(): void;
}

declare var StaticText: UiText;
declare var UrlRouter: Router;
declare var TL: any;  // TimelineJS
declare var Model: AppModel;

class AppModel {

	Api: IApi;
	User: User;
	Users: User[];
	Jobs: Job[];
	TimelineEras: TimelineEra[];
	Assessments: Assessment[];
	ChatPosts: ChatPost[];
	CurrentAssessment: Assessment;
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	MenuItems: MenuItem[];
	Timeline: Timeline;
	CurrentPage: KnockoutObservable<Page>;
	MenuVisible: KnockoutObservable<Boolean>;
	// PageContentVisible: KnockoutComputed<Boolean>;
	PageContentVisible: KnockoutObservable<Boolean>;

	constructor (api: IApi, user: IUser, users: IUser[], jobs: IJob[], eras: ITimelineEra[],
		assessments: IAssessment[], chatPosts: IChatPost[],
		messageStatus: MessageDisplayStatus, currentMessage: string,
		logger: ILogger, errorHandler: IErrorHandler) {

		var utils = new Utilities(errorHandler);
		
		this.Api = api;
		this.User = utils.CreateUser(user);
		this.SetJobs(jobs, utils);
		this.SetUsers(users, utils);
		this.SetAssessments(assessments, utils);
		this.SetChatPosts(chatPosts, utils);
		this.SetTimeline(jobs, eras, utils)
		this.MessageStatus = messageStatus;
		this.CurrentMessage = currentMessage;
		this.SetMenuItems();
		this.CurrentPage = ko.observable<Page>(Page.Home);
		this.MenuVisible = ko.observable<Boolean>(false);
		// this.PageContentVisible = ko.computed(() => !this.MenuVisible) ;
		this.PageContentVisible = ko.observable<Boolean>(true);
		this.SetPage(Page.Home, true);
	}

	// PUBLIC METHODS

	public ToggleMenu() {
		Model.MenuVisible(!Model.MenuVisible());
		Model.PageContentVisible(!Model.MenuVisible())
	}

	public StartAssessment (assessmentId: number): void {
		// Ensure no other assessments are in progress.
		this.Assessments.forEach((x) => { x.InProgress = false; });

		// Flag the selected assessment as in progress
		var selectedAssessment = _.find(this.Assessments, (x) => { x.ID === assessmentId });
		selectedAssessment.InProgress = true;
	}

	public SetMessage(messageStatus: MessageDisplayStatus, message: string): void {
		this.CurrentMessage = message;
		this.MessageStatus = messageStatus;
	}

	public ClearMessage (): void {
		this.CurrentMessage = "";
		this.MessageStatus = MessageDisplayStatus.None;
	}

	public SetPage(page: Page, pageLoad: boolean = false) {
		this.MenuItems.forEach((x) => {
			this.SetSelectedMenuItem(x, page);
			if (x.SubItems && x.SubItems.length > 0)
			{
				x.SubItems.forEach((sub) => {
					this.SetSelectedMenuItem(sub, page);
				});
			}
		});

		this.PageContentVisible(true);
		this.MenuVisible(false);

		var mainPageId = "page-content-container";

		this.CurrentPage(page);
		this.InsertTemplate(page, mainPageId);
		if (!pageLoad) {
			var element = document.getElementById(mainPageId);
			ko.cleanNode(element);
			ko.applyBindings(StaticText, document.getElementById(mainPageId));
		}
	}

	// PRIVATE METHODS
	private InsertTemplate(page: Page, mainPageId: string): void {
		var container = $("#" + mainPageId);

		switch (page)
		{
			case Page.Home:
				container.html(home_html);
				break;
			case Page.About:
				container.html(about_html);
				break;
			case Page.Career:
				container.html(career_html);
				var timeline = new TL.Timeline('timeline', this.Timeline);
				break;
			case Page.Programming_CSharp:
				container.html(programming_csharp_html);
				break;
			case Page.Programming_Typescript:
				container.html(programming_typescript_html);
				break;
		}	
		
	}

	private SetSelectedMenuItem(menuItem: MenuItem, page: Page): void {
		if (menuItem.Page === page) {
			menuItem.Selected(true);
		} else {
			menuItem.Selected(false);		
		}
	}

	private SetMenuItems(): void {
		var menuItems = new Array<MenuItem>();

		menuItems.push(new MenuItem(StaticText.Current.Menu_Home, Page.Home, MenuItemLevel.One, null));
		menuItems.push(new MenuItem(StaticText.Current.Menu_About, Page.About, MenuItemLevel.One, null));
		menuItems.push(new MenuItem(StaticText.Current.Menu_Career, Page.Career, MenuItemLevel.One, null));

		var programmingItems = new Array<MenuItem>();
		programmingItems.push(new MenuItem(StaticText.Current.Menu_Programming_CSharp, Page.Programming_CSharp, MenuItemLevel.Two, null));
		programmingItems.push(new MenuItem(StaticText.Current.Menu_Programming_Typescript, Page.Programming_Typescript, MenuItemLevel.Two, null));
		menuItems.push(new MenuItem(StaticText.Current.Menu_Programming, null, MenuItemLevel.One, programmingItems));


		menuItems.push(new MenuItem(StaticText.Current.Menu_Logout, Page.Logout, MenuItemLevel.One, null));

		this.MenuItems = menuItems;
	}

	private SortAssessments(): void {
		this.Assessments = _.orderBy(this.Assessments, ['Name'], ['asc']);
	}

	private SortChatPosts(): void {
		this.ChatPosts = _.orderBy(this.ChatPosts, ['Time'], ['asc']);
	}

	private SortJobs(): void {
		this.Jobs = _.orderBy(this.Jobs, ['Start'], ['asc']);
	}

	
	private SetUsers(users: IUser[], utils: Utilities): void {
		this.Users = new Array<User>();
		users.forEach((x) => { this.Users.push(utils.CreateUser(x))});
	}

	private SetAssessments(assessments: IAssessment[], utils: Utilities): void {
		this.Assessments = new Array<Assessment>();
		assessments.forEach((x) => { this.Assessments.push(utils.CreateAssessment(x))});
		this.SortAssessments();
	}

	private SetChatPosts(chatPosts: IChatPost[], utils: Utilities): void {
		this.ChatPosts = new Array<ChatPost>();
		chatPosts.forEach((post) => {
			var user = _.find(this.Users, (u) => { return u.ID === post.UserID });
			this.ChatPosts.push(utils.CreateChatPost(post, user)) 
		});
		this.SortChatPosts();
	}

	private SetJobs(jobs: IJob[], utils: Utilities): void {
		this.Jobs = new Array<Job>();
		jobs.forEach((x) => this.Jobs.push(utils.CreateJob(x)));
		this.SortJobs();
	}

	private SetTimeline (jobs: IJob[], eras: ITimelineEra[], utils: Utilities) {
		var timelineSlides = new Array<TimelineSlide> ();
		jobs.forEach((x) => timelineSlides.push(utils.CreateTimelineSlide(x, utils)));

		var timelineEras = new Array<TimelineEra> ();
		eras.forEach((x) => timelineEras.push(utils.CreateTimelineEra(x)));

		this.Timeline = new Timeline(timelineSlides, timelineEras);
	}
}