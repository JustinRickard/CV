/// <reference path="Page.ts" />
/// <reference path="AppModel.ts" />
/// <reference path="Router.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

interface IMenuItem {
	Page: Page;
	Level: MenuItemLevel;
	SubItems: IMenuItem[];
}

// Let MenuItem know about the model
declare var Model: AppModel;
declare var UrlRouter: Router;

class MenuItem implements IMenuItem {

	Page: Page;
	SubItems: MenuItem[];
	Level: MenuItemLevel;
	Selected: KnockoutObservable<boolean>;
	Expanded: KnockoutObservable<boolean>;

	constructor (page: Page, level: MenuItemLevel, subItems: MenuItem[]) {
		this.Page = page;
		this.SubItems = subItems;
		this.Level = level;
		this.Selected = ko.observable(false);
		this.Expanded = ko.observable(false);
	}

	public Select (): void {
		if (!this.SubItems || this.SubItems.length === 0) {
			UrlRouter.NavigateTo(this.Page.Url);
		} else {
			this.Expanded(!this.Expanded());
		}
	}
}