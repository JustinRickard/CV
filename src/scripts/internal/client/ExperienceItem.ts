/// <reference path="UiText.ts" />
/// <reference path="../shared/models/Enums.ts" />

interface IExperienceItem {
	Name: string;
	Years: number;
	Type: TechnologyType;
}

interface IExperienceItemClientDto {
	Name: string;
	Years: number;
	Description: string;
	Type: TechnologyType;
}

class ExperienceItem implements IExperienceItemClientDto {
	Type: TechnologyType;
	Name: string;
	Description: string;
	Years: number;
	StaticText: IUiTextManager;

	constructor(
		name: string,
		years: number,
		type: TechnologyType,
		staticText: IUiTextManager
		) 
	{
		this.Name = name;
		this.Years = years;
		this.Type = type;
		this.StaticText = staticText;
		this.Description = years === 1 ? years + " " + this.StaticText.Current.Experience_Year : years + " " + this.StaticText.Current.Experience_Years;
	}
}