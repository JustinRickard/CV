/// <reference path="Job.ts" />
/// <reference path="../shared/models/Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="UiText.ts" />
/// <reference path="ExperienceItem.ts" />
/// <reference path="helpers/MenuHelper.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/timelinejs/timelinejs.d.ts" />

interface KnockoutBindingHandlers {
    slideHorizontal: KnockoutBindingHandler;
    slideVertical: KnockoutBindingHandler;
}

/*
interface Window {
	timeline: any;
}
*/

interface IAppModel {
	Pages: IPage[];
	Jobs: IJobServerDto[];
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

	ErrorHandler: IErrorHandler;
	Pages: IPage[];
	UrlRouter: Router;
	Experience: IExperienceItemClientDto[];
	ExperienceServer: IExperienceItemClientDto[];
	ExperienceDatabase: IExperienceItemClientDto[];
	ExperienceFrontEnd: IExperienceItemClientDto[];
	Jobs: Job[];
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	MenuItems: MenuItem[];
	CurrentPage: KnockoutObservable<Page>;
	MenuVisible: KnockoutObservable<Boolean>;
	PageContentVisible: KnockoutObservable<Boolean>;
	MessageMediator: Mediator;
	MainPageId: string;

	constructor (experience: IExperienceItem[], jobs: IJobServerDto[],
		logger: ILogger, errorHandler: IErrorHandler) {

		var utils = new Utilities(errorHandler);

		this.ErrorHandler = errorHandler;
		this.Experience = this.GetExperience(experience, StaticText);
		this.ExperienceServer = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.Server; });
		this.ExperienceDatabase = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.Database; });
		this.ExperienceFrontEnd = _.filter(this.Experience, (o) => { return o.Type == TechnologyType.FrontEnd; });
		this.Pages = new PageRepository(StaticText).Get();
    	this.UrlRouter = new Router(this.Pages);
    	this.MessageMediator = new Mediator(this.UrlRouter);
		this.SetJobs(jobs, utils);
		this.MessageStatus = MessageDisplayStatus.None;
		this.CurrentMessage = "";
		this.SetMenuItems(this.Pages);
		var startingPage = _.first(this.Pages);
		this.CurrentPage = ko.observable<Page>(startingPage);
		this.MenuVisible = ko.observable<Boolean>(false);
		this.PageContentVisible = ko.observable<Boolean>(true);
		this.MainPageId = "page-content-container";
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
		$('html,body').scrollTop(0);
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

		this.CurrentPage(page);
		this.InsertTemplate(page, this.MainPageId);
		if (!pageLoad) {
			this.ApplyBindings(this.MainPageId);
		}
	}

	public ApplyBindings(mainPageId: string) {
		var element = document.getElementById(mainPageId);
		ko.cleanNode(element);

		ko.bindingHandlers.slideVertical = {
		    init: function (element, valueAccessor) {
		        var value = ko.utils.unwrapObservable(valueAccessor());
		        $(element).toggle(value);
		    },
		    update: function (element, valueAccessor) {
		        var value = ko.utils.unwrapObservable(valueAccessor());
		        value ? $(element).slideDown() : $(element).slideUp();
		    }
		}
     
		ko.applyBindings(StaticText, document.getElementById(mainPageId));
	}

	// PRIVATE METHODS

	private GetExperience(experienceRecords: IExperienceItem[], staticText: IUiTextManager): IExperienceItemClientDto[] {
		var experience = new Array<IExperienceItemClientDto> ();

		experienceRecords.forEach((x) => {
			experience.push(new ExperienceItem(x.Name, x.Years, x.Type, staticText))
		});

		return experience;
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

		/* Timeline JS3 can't be used with FontAwesome. Use when fixed.
		if (page.PartialFileName === "career.html") {
			window.timeline = new TL.Timeline('timeline-embed', this.Timeline);
		}
		*/	
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
		this.Jobs = _.orderBy(this.Jobs, ['Start'], ['desc']);
	}

	private SetJobs(jobs: IJobServerDto[], utils: Utilities): void {
		this.Jobs = new Array<Job>();
		jobs.forEach((x) => this.Jobs.push(utils.CreateJob(x)));
		this.SortJobs();
	}
}