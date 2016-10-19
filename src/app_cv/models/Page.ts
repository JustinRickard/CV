/// <reference path="../resources/UiText.ts" />

import { IStaticText, StaticText } from './StaticText';

export interface IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;
	Text: IUiText;
	UsesClientSideRouting: boolean;
}

// declare var StaticText: IStaticText;

export class Page implements IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;
	Text: IUiText;
	UsesClientSideRouting: boolean;

	constructor (
		id: number,
		displayNameKey: string, 
		childrenPages: IPage[],
		partialFileName: string,
		url: string,
		text: IUiText,
		UsesClientSideRouting: boolean = true
	)
	{
		this.Text = text;
		this.ID = id;
		this.DisplayNameKey = displayNameKey;
		this.DisplayName = this.Text[displayNameKey];
		this.UsesClientSideRouting = UsesClientSideRouting;

		if (childrenPages && childrenPages.length > 0) {
			this.ChildrenPages = childrenPages;
			this.PartialFileName = "";
			this.Url = "";
		} else {
			this.PartialFileName = partialFileName;
			this.Url = url;
		}	
	}
}