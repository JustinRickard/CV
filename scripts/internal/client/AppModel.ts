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
/// <reference path="../../../partials/home.ts" />
/// <reference path="../../../partials/about.ts" />
/// <reference path="../../../partials/career.ts" />
/// <reference path="../../../partials/programming_csharp.ts" />
/// <reference path="../../../partials/programming_typescript.ts" />
/// <reference path="../../external/DefinitelyTyped/lodash/lodash.d.ts" />

interface IAppModel {
	Api: IApi;
	User: IUser;
	Users: IUser[];
	Jobs: IJob[];
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

class AppModel {

	Api: IApi;
	User: User;
	Users: User[];
	Jobs: Job[];
	Assessments: Assessment[];
	ChatPosts: ChatPost[];
	CurrentAssessment: Assessment;
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	MenuItems: MenuItem[];
	CurrentPage: KnockoutObservable<Page>;

	constructor (api: IApi, user: IUser, users: IUser[], jobs: IJob[], 
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
		this.MessageStatus = messageStatus;
		this.CurrentMessage = currentMessage;
		this.SetMenuItems();
		this.CurrentPage = ko.observable<Page>(Page.Home);
		this.SetPage(Page.Home, true);
	}

	// PUBLIC METHODS

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

		this.CurrentPage(page);
		this.InsertTemplate(page);
		if (!pageLoad) {
			var element = document.getElementById("page-content-container");
			ko.cleanNode(element);
			ko.applyBindings(StaticText, document.getElementById("page-content-container"));
		} 
	}

	// PRIVATE METHODS
	private InsertTemplate(page: Page): void {
		var container = $("#page-content-container");

		switch (page)
		{
			case Page.Home:
				container.html(Home_Html);
				break;
			case Page.About:
				container.html(About_Html);
				break;
			case Page.Career:
				container.html(Career_Html);
				break;
			case Page.Programming_CSharp:
				container.html(CSharp_Html);
				break;
			case Page.Programming_Typescript:
				container.html(Typescript_Html);
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
}