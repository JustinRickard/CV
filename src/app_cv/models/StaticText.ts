/// <reference path="../../shared/models/Enums.ts" />
/// <reference path="../resources/UiText.ts" />

import { CultureCode } from '../../shared/models/Enums';
import en_gb from '../resources/en-GB';

export interface IStaticText {
	Current: IUiText;
}

export module StaticText {

	export var Current: IUiText;
	var enGB: IUiText;

	/*

	class Instance implements IStaticText {
		Current: IUiText;

		constructor() {
			this.Current = Current;
		}
	}

	export function GetInstance(): Instance {
		return new Instance();
	}
*/
	export function Init(cultureCode: CultureCode = CultureCode.en_GB) {
	// Define languages
			this.enGB = new en_gb();

			// Set current language
			this.SelectLanguage(cultureCode);
	}

	export function SelectLanguage(cultureCode: CultureCode): void {
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
}