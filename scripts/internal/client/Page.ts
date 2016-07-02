/// <reference path="UiText.ts" />

interface IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;
	StaticText: IUiTextManager;
	UsesClientSideRouting: boolean;
}

// declare var StaticText: IUiTextManager;

class Page implements IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;
	StaticText: IUiTextManager;
	UsesClientSideRouting: boolean;

	constructor (
		id: number,
		displayNameKey: string, 
		childrenPages: IPage[],
		partialFileName: string,
		url: string,
		staticText: IUiTextManager,
		UsesClientSideRouting: boolean = true
	)
	{
		this.StaticText = staticText;
		this.ID = id;
		this.DisplayNameKey = displayNameKey;
		this.DisplayName = this.StaticText.Current[displayNameKey];
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