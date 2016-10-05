/// <reference path="Page.ts" />
/// <reference path="Router.ts" />
/// <reference path="../mediator/Mediator.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

interface IMenuItem {
	Page: Page;
	Level: MenuItemLevel;
	SubItems: IMenuItem[];
	Selected: KnockoutObservable<boolean>;
	Expanded: KnockoutObservable<boolean>;
	Select(): void;
}

// Let MenuItem know about the router
// declare var UrlRouter: Router;

class MenuItem implements IMenuItem {

	Page: Page;
	SubItems: MenuItem[];
	Level: MenuItemLevel;
	Mediator: IMediator;
	Selected: KnockoutObservable<boolean>;
	Expanded: KnockoutObservable<boolean>;
	ChannelName: string;

	constructor (page: Page, level: MenuItemLevel, subItems: MenuItem[], mediator: IMediator) {
		this.Page = page;
		this.SubItems = subItems;
		this.Level = level;
		this.Selected = ko.observable(false);
		this.Expanded = ko.observable(false);
		this.Mediator = mediator;
	}

	public Select (): void {
		if (!this.SubItems || this.SubItems.length === 0) {
			// UrlRouter.NavigateTo(this.Page.Url);
			this.Mediator.PublishChangePage(this.Page.Url);
		} else {
			this.Expanded(!this.Expanded());
		}
	}
}