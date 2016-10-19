/// <reference path="../resources/UiText.ts" />
/// <reference path="../../shared/models/Enums.ts" />

import { TechnologyType } from '../../shared/models/Enums';
import { IStaticText, StaticText } from './StaticText';

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

	constructor(
		name: string,
		years: number,
		type: TechnologyType,
		description: string
		) 
	{
		this.Name = name;
		this.Years = years;
		this.Type = type;
		this.Description = description;
	}
}