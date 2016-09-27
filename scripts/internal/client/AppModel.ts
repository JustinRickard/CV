/// <reference path="API.ts" />
/// <reference path="Job.ts" />
/// <reference path="Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="ExperienceItem.ts" />
/// <reference path="helpers/MenuHelper.ts" />
/// <reference path="timeline/Timeline.ts" />
/// <reference path="timeline/TimelineSlide.ts" />
/// <reference path="timeline/TimelineEra.ts" />
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
	Experience: IExperienceItem[];
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
	Pages: IPage[];
	UrlRouter: Router;
	Experience: IExperienceItemClientDto[];
	ExperienceServer: IExperienceItemClientDto[];
	ExperienceDatabase: IExperienceItemClientDto[];
	ExperienceFrontEnd: IExperienceItemClientDto[];
	Jobs: Job[];
	TimelineEras: TimelineEra[];
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	MenuItems: MenuItem[];
	Timeline: Timeline;
	CurrentPage: KnockoutObservable<Page>;
	MenuVisible: KnockoutObservable<Boolean>;
	PageContentVisible: KnockoutObservable<Boolean>;
	MessageMediator: Mediator;

	constructor (api: IApi, experience: IExperienceItem[], jobs: IJob[], eras: ITimelineEra[],
		messageStatus: MessageDisplayStatus, currentMessage: string,
		logger: ILogger, errorHandler: IErrorHandler) {

		var utils = new Utilities(errorHandler);

		this.Api = api;
		this.ErrorHandler = errorHandler;
		this.Experience = this.GetExperience(experience, StaticText);
		this.ExperienceServer = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.Server; });
		this.ExperienceDatabase = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.Database; });
		this.ExperienceFrontEnd = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.FrontEnd; });
		this.Pages = new PageRepository(StaticText).Get();
    	this.UrlRouter = new Router(this.Pages);
    	this.MessageMediator = new Mediator(this.UrlRouter);
		this.SetJobs(jobs, utils);
		this.SetTimeline(jobs, eras, utils)
		this.MessageStatus = messageStatus;
		this.CurrentMessage = currentMessage;
		this.SetMenuItems(this.Pages);
		var startingPage = _.first(this.Pages);
		this.CurrentPage = ko.observable<Page>(startingPage);
		this.MenuVisible = ko.observable<Boolean>(false);
		this.PageContentVisible = ko.observable<Boolean>(true);
		// this.SetPage(startingPage.ID, true);
	}

	// PUBLIC METHODS

	public ToggleMenu() {
		Model.MenuVisible(!Model.MenuVisible());
		Model.PageContentVisible(!Model.MenuVisible())
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

	private GetExperience(experienceRecords: IExperienceItem[], staticText: IUiTextManager): IExperienceItemClientDto[] {
		var experience = new Array<IExperienceItemClientDto> ();

		experienceRecords.forEach((x) => {
			experience.push(new ExperienceItem(x.Name, x.Years, x.Type, staticText))
		});

		return experience;
	}

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

	private SortJobs(): void {
		this.Jobs = _.orderBy(this.Jobs, ['Start'], ['asc']);
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