/// <reference path="Enums.ts" />

import {TechnologyType} from './Enums'

export interface IExperienceItem {
	Name: string;
	Years: number;
	Type: TechnologyType;
}

export class ExperienceItem implements IExperienceItem {
	Type: TechnologyType;
	Name: string;
	Years: number;

	constructor(
		name: string,
		years: number,
		type: TechnologyType
		) 
	{
		this.Name = name;
		this.Years = years;
		this.Type = type;
	}
}