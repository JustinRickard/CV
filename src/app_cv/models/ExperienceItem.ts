/// <reference path="../resources/UiText.ts" />
/// <reference path="../../shared/models/Enums.ts" />

import { TechnologyType } from '../../shared/models/Enums';
import { IUiTextManager, UiTextManager } from './UiTextManager';

export interface IExperienceItem {
	Name: string;
	Years: number;
	Type: TechnologyType;
}

export interface IExperienceItemClientDto {
	Name: string;
	Years: number;
	Description: string;
	Type: TechnologyType;
}

export class ExperienceItem implements IExperienceItemClientDto {
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