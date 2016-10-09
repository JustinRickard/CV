/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="../resources/UiText.ts" />

import { CultureCode } from '../../shared/models/Enums';

export interface IUiTextManager {
	Current: IUiText;
}

export class UiTextManager implements IUiTextManager {
	Current: IUiText;
	enGB: IUiText;
	// Other languages here

	constructor(cultureCode: CultureCode) {
		// Define languages
		this.enGB = new en_gb();

		// Set current language
		this.SelectLanguage(cultureCode);
	}

	public SelectLanguage(cultureCode: CultureCode): void {
		switch (cultureCode)
		{
			case CultureCode.en_GB:
				this.Current = this.enGB;
				break;
			case CultureCode.fr_FR:
				break;
			case CultureCode.de_DE:
				break;
			case CultureCode.pt_BR:
				break;
			case CultureCode.es_ES:
				break;
		}
	}


/*
	public ReapplyBindings(): void {
		ko.applyBindings(this);
	}
	*/
}