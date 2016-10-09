/// <reference path="../models/ErrorHandler.ts" />
/// <reference path="../models/MenuItem.ts" />
/// <reference path="../models/Page.ts" />

import { IMenuItem } from '../models/MenuItem';
import { IPage } from '../models/Page';
import { ICvErrorHandler } from '../models/ErrorHandler';


export interface IMenuHelper {
	SetSelectedPage(menuItems: IMenuItem[], page: IPage);
}

export class MenuHelper {

	ErrorHandler: ICvErrorHandler;

	constructor(errorHandler: ICvErrorHandler) {
		this.ErrorHandler = errorHandler;
	}

	public SetSelectedPage(menuItems: IMenuItem[], page: IPage) {
		menuItems.forEach((x) => {
			this.SetSelectedMenuItem(x, page);
			if (x.SubItems && x.SubItems.length > 0)
			{
				x.SubItems.forEach((sub) => {
					this.SetSelectedMenuItem(sub, page);
				});
			}
		});
	}

	private SetSelectedMenuItem(menuItem: IMenuItem, page: IPage): void {
		if (menuItem.Page === page) {
			menuItem.Selected(true);
		} else {
			menuItem.Selected(false);		
		}
	}
}