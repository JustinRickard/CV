/// <reference path="UiText.ts" />

interface IExperienceItem {
	Name: string;
	Years: number;
}

interface IExperienceItemClientDto {
	Name: string;
	Years: number;
	Description: string;
}

class ExperienceItem implements IExperienceItemClientDto {
	Name: string;
	Description: string;
	Years: number;
	StaticText: IUiTextManager;

	constructor(
		name: string,
		years: number,
		staticText: IUiTextManager
		) 
	{
		this.Name = name;
		this.Years = years;
		this.StaticText = staticText;
		this.Description = years === 1 ? years + " " + this.StaticText.Current.Experience_Year : years + " " + this.StaticText.Current.Experience_Years;
	}
}