/// <reference path="../../../typings/index.d.ts" />
/// <reference path="AppModel.ts" />
/// <reference path="Page.ts" />
/// <reference path="../repositories/PageRepository.ts" />
/// <reference path="../../shared/models/Enums.ts" />

import { IAppModel, AppModel } from './AppModel';
import { IPage, Page } from './Page';

export class Router {

	Pages: Page[];

	constructor (pages: Page[]) {
		this.Pages = pages;
	}

	public Initialise() {
		var routeData = this.GetRoutieData();
		routie(routeData);
		this.NavigateTo("/");
	}

	public NavigateTo (url: string) {
			routie(url);
	}

	private GetRoutieData(): { [key: string]: Function; } {
		var routes: { [key: string]: Function; } = { };

		this.Pages.forEach((page) => {
			var children = page.ChildrenPages;
			if (children && children.length > 0)
			{
				children.forEach((childPage) => {
					this.AddPageRoute(childPage, routes);
				});
			} else {
				this.AddPageRoute(page, routes);
			}
		});

		return routes;
	}

	private AddPageRoute(page: Page, routes: { [key: string]: Function; }) {
		routes[page.Url] = new Function('p', 'Model.SetPage(' + page.ID + ')');
	}
}