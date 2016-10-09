/// <reference path="Page.ts" />
/// <reference path="Router.ts" />
/// <reference path="../mediator/Mediator.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

import { MenuItemLevel } from '../../shared/models/Enums';
import { IPage, Page } from './Page';
import { IMediator } from '../mediator/Mediator';

export interface IMenuItem {
	Page: Page;
	Level: MenuItemLevel;
	SubItems: IMenuItem[];
	Selected: KnockoutObservable<boolean>;
	Expanded: KnockoutObservable<boolean>;
	Select(): void;
}

export class MenuItem implements IMenuItem {

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