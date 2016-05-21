/// <reference path="UiText.ts" />

interface IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;
}

declare var StaticText: IUiTextManager;

class Page implements IPage {
	ID: number;
	DisplayNameKey: string;
	ChildrenPages: IPage[];
	PartialFileName: string;
	Url: string;
	DisplayName: string;

	constructor (
		id: number,
		displayNameKey: string, 
		childrenPages: IPage[],
		partialFileName: string,
		url: string
	)
	{
		this.ID = id;
		this.DisplayNameKey = displayNameKey;
		this.DisplayName = StaticText.Current[displayNameKey];

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