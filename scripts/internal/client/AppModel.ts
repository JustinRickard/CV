/// <reference path="API.ts" />
/// <reference path="User.ts" />
/// <reference path="ChatPost.ts" />
/// <reference path="assessment/Assessment.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="helpers/MenuHelper.ts" />
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

interface Window {
	timeline: any;
}

interface IAppModel {
	Api: IApi;
	User: IUser;
	Pages: IPage[];
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

declare var StaticText: IUiTextManager;
declare var TL: any;  // TimelineJS
declare var Model: AppModel;
declare var window: Window;

class AppModel {

	Api: IApi;
	ErrorHandler: IErrorHandler;
	User: User;
	Pages: IPage[];
	UrlRouter: Router;
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
	MessageMediator: Mediator;

	constructor (api: IApi, user: IUser, users: IUser[], jobs: IJob[], eras: ITimelineEra[],
		assessments: IAssessment[], chatPosts: IChatPost[],
		messageStatus: MessageDisplayStatus, currentMessage: string,
		logger: ILogger, errorHandler: IErrorHandler) {

		var utils = new Utilities(errorHandler);

		this.Api = api;
		this.ErrorHandler = errorHandler;
		this.User = utils.CreateUser(user);
		this.Pages = new PageRepository(StaticText).Get();
    	// Set the # router
    	this.UrlRouter = new Router(this.Pages);
    	this.MessageMediator = new Mediator(this.UrlRouter);
		this.SetJobs(jobs, utils);
		this.SetUsers(users, utils);
		this.SetAssessments(assessments, utils);
		this.SetChatPosts(chatPosts, utils);
		this.SetTimeline(jobs, eras, utils)
		this.MessageStatus = messageStatus;
		this.CurrentMessage = currentMessage;
		this.SetMenuItems(this.Pages);
		this.CurrentPage = ko.observable<Page>(_.first(this.Pages));
		this.MenuVisible = ko.observable<Boolean>(false);
		// this.PageContentVisible = ko.computed(() => !this.MenuVisible) ;
		this.PageContentVisible = ko.observable<Boolean>(true);
		this.SetPage(_.first(this.Pages).ID, true);
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

	public SetPage(pageId: number, pageLoad: boolean = false) {
		var page: Page = this.GetPageById(this.Pages, pageId);
		var menuHelper: IMenuHelper = new MenuHelper(this.ErrorHandler);

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
			this.ApplyBindings(mainPageId);
		}
	}

	// PRIVATE METHODS

	private ApplyBindings(mainPageId: string) {
		var element = document.getElementById(mainPageId);
		ko.cleanNode(element);
		ko.applyBindings(StaticText, document.getElementById(mainPageId));
	}

	private GetPageById(pages: Page[], pageId: number): Page {
		var page:   Page;

		page = this.GetPageInCollectionById(pageId, pages);

		if (!page) {
			pages.forEach((p) => {
				var children = p.ChildrenPages;
				if (children && children.length > 0)
				{
					var result = this.GetPageInCollectionById(pageId, children);
					if (result) {
						page = result;
						return page;
					}
				}
			});
		}
		return page;
	}

	private GetPageInCollectionById(pageId: number, pages: Page[]): Page {
		 return _.find(pages, (p) => { return p.ID === pageId; });
	}

	private InsertTemplate(page: Page, mainPageId: string): void {
		var container = $("#" + mainPageId);
		var pageVariable: string = page.PartialFileName.replace(".html", "_html");
		container.html(eval(pageVariable));

		if (page.PartialFileName === "career.html") {
			window.timeline = new TL.Timeline('timeline-embed', this.Timeline);
		}	
	}

	private SetSelectedMenuItem(menuItem: MenuItem, page: IPage): void {
		if (menuItem.Page === page) {
			menuItem.Selected(true);
		} else {
			menuItem.Selected(false);		
		}
	}

	private SetMenuItems(pages: IPage[]): void {
		var menuItems = new Array<MenuItem>();

		pages.forEach((page) => {

			var subitems = new Array<MenuItem>();

			if (page.ChildrenPages && page.ChildrenPages.length > 0) {
				page.ChildrenPages.forEach((child) => {
					subitems.push(new MenuItem(child, MenuItemLevel.Two, null, this.MessageMediator));
				});
			}

			menuItems.push(new MenuItem(page, MenuItemLevel.One, subitems, this.MessageMediator));
		});

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