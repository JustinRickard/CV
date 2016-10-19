/// <reference path="Job.ts" />
/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Logger.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="MenuItem.ts" />
/// <reference path="../resources/UiText.ts" />
/// <reference path="ExperienceItem.ts" />
/// <reference path="StaticText.ts" />
/// <reference path="../helpers/MenuHelper.ts" />
/// <reference path="../custom_typings/KnockoutBindingHandlers.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/timelinejs/timelinejs.d.ts" />

import { CultureCode, MessageDisplayStatus, TechnologyType, MenuItemLevel } from '../../shared/models/Enums'
import { IExperienceItemClientDto, IExperienceItem, ExperienceItem } from './ExperienceItem';
import { IStaticText, StaticText } from './StaticText';
// import { KnockoutBindingHandlers } from '../custom_typings/KnockoutBindingHandlers';
import { IPage, Page } from './Page';
import { IJobServerDto, IJob, Job } from './Job';
import { ICvErrorHandler, CvErrorHandler } from './ErrorHandler';
import { Router } from './Router';
import { IMenuItem, MenuItem } from './MenuItem';
import { Utilities } from './Utilities';
import { ICvLogger, CvLogger } from './Logger';
import { IMediator, Mediator } from '../mediator/Mediator';
import { IMenuHelper, MenuHelper } from '../helpers/MenuHelper';
import { IPageRepository, PageRepository } from '../repositories/PageRepository';

export interface IAppModel {
	Pages: IPage[];
	Jobs: IJobServerDto[];
	MessageStatus: MessageDisplayStatus;
	CurrentMessage: string;
	CultureCode: CultureCode;
	Experience: IExperienceItem[];
	SetMessage(messageStatus: MessageDisplayStatus, message: string): void;
	ClearMessage(): void;
}

/*
declare var StaticText: IStaticText;
declare var TL: any;  // TimelineJS
declare var Model: AppModel;
declare var window: Window;
*/

export module AppModel {

	var MainPageContentId: string;
	var ErrorHandler: ICvErrorHandler;
	var Pages: IPage[];
	var UrlRouter: Router;
	var Experience: IExperienceItemClientDto[];
	var ExperienceServer: IExperienceItemClientDto[];
	var ExperienceDatabase: IExperienceItemClientDto[];
	var ExperienceFrontEnd: IExperienceItemClientDto[];
	var Jobs: Job[];
	var MessageStatus: MessageDisplayStatus;
	var CurrentMessage: string;
	var CultureCode: CultureCode;
	var MenuItems: MenuItem[];
	var CurrentPage: KnockoutObservable<Page>;
	var MenuVisible: KnockoutObservable<Boolean>;
	var PageContentVisible: KnockoutObservable<Boolean>;
	var MessageMediator: Mediator;

	export function Init(experience: IExperienceItem[], jobs: IJobServerDto[],
		logger: ICvLogger, errorHandler: ICvErrorHandler, mainPageContainerId: string) {

		var utils = new Utilities(errorHandler);
		var uiText = StaticText.Current;

		MainPageContentId = mainPageContainerId;
		ErrorHandler = errorHandler;
		Experience = GetExperience(experience, uiText);
		ExperienceServer = _.filter(Experience, (o) => { return o.Type == TechnologyType.Server; });
		ExperienceDatabase = _.filter(Experience, (o) => { return o.Type == TechnologyType.Database; });
		ExperienceFrontEnd = _.filter(Experience, (o) => { return o.Type == TechnologyType.FrontEnd; });
		Pages = new PageRepository(uiText).Get();
    	UrlRouter = new Router(Pages);
    	MessageMediator = new Mediator(UrlRouter);
		SetJobs(jobs, utils);
		MessageStatus = MessageDisplayStatus.None;
		CurrentMessage = "";
		SetMenuItems(Pages);
		var startingPage = _.first(Pages);
		CurrentPage = ko.observable<Page>(startingPage);
		MenuVisible = ko.observable<Boolean>(false);
		PageContentVisible = ko.observable<Boolean>(true);
		ApplyBindings(mainPageContainerId);
		UrlRouter.Initialise();
	}

	// PUBLIC METHODS

	export function ToggleMenu() {
		MenuVisible(!this.MenuVisible());
		PageContentVisible(!this.MenuVisible())
	}

	export function SetMessage(messageStatus: MessageDisplayStatus, message: string): void {
		CurrentMessage = message;
		MessageStatus = messageStatus;
	}

	export function ClearMessage (): void {
		CurrentMessage = "";
		MessageStatus = MessageDisplayStatus.None;
	}

	export function SetPage(pageId: number, pageLoad: boolean = false) {
		$('html,body').scrollTop(0);
		var page: Page = this.GetPageById(this.Pages, pageId);
		var menuHelper: IMenuHelper = new MenuHelper(this.ErrorHandler);

		MenuItems.forEach((x) => {
			SetSelectedMenuItem(x, page);
			if (x.SubItems && x.SubItems.length > 0)
			{
				x.SubItems.forEach((sub) => {
					SetSelectedMenuItem(sub, page);
				});
			}
		});

		PageContentVisible(true);
		MenuVisible(false);

		CurrentPage(page);
		InsertTemplate(page, MainPageContentId);
		if (!pageLoad) {
			ApplyBindings(MainPageContentId);
		}
	}

	// PRIVATE METHODS

	function ApplyBindings(mainPageId: string) {
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

	

	function GetExperience(experienceRecords: IExperienceItem[], text: IUiText): IExperienceItemClientDto[] {
		var experience = new Array<IExperienceItemClientDto> ();

		experienceRecords.forEach((x) => {
			var yearsText = x.Years === 1 ? text.Experience_Year : text.Experience_Years;
			var description = x.Years + " " + yearsText;
			experience.push(new ExperienceItem(x.Name, x.Years, x.Type, description))
		});

		return experience;
	}

	function GetPageById(pages: Page[], pageId: number): Page {
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

	function GetPageInCollectionById(pageId: number, pages: Page[]): Page {
		 return _.find(pages, (p) => { return p.ID === pageId; });
	}

	function InsertTemplate(page: Page, mainPageId: string): void {
		var container = $("#" + mainPageId);
		var pageVariable: string = page.PartialFileName.replace(".html", "_html");
		container.html(eval(pageVariable));

		/* Timeline JS3 can't be used with FontAwesome. Use when fixed.
		if (page.PartialFileName === "career.html") {
			window.timeline = new TL.Timeline('timeline-embed', this.Timeline);
		}
		*/	
	}

	function SetSelectedMenuItem(menuItem: MenuItem, page: IPage): void {
		if (menuItem.Page === page) {
			menuItem.Selected(true);
		} else {
			menuItem.Selected(false);		
		}
	}

	function SetMenuItems(pages: IPage[]): void {
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

		MenuItems = menuItems;
	}

	function SortJobs(): void {
		Jobs = _.orderBy(Jobs, ['Start'], ['desc']);
	}

	function SetJobs(jobs: IJobServerDto[], utils: Utilities): void {
		Jobs = new Array<Job>();
		jobs.forEach((x) => Jobs.push(utils.CreateJob(x)));
		SortJobs();
	}
}