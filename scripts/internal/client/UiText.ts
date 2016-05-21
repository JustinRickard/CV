/// <reference path="Enums.ts" />
/// <reference path="en-GB.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

interface IUiText {

	Banner_Logo: string;
	Banner_Slogan1: string;
	Banner_Slogan2: string;
	Banner_Slogan3: string;

	Login_Title: string;
	Login_Username: string;
	Login_Password: string;
	Login_LoginButton: string;
	Login_Register_Title: string;
	Login_Register_Button: string;
	Login_ForgottenPassword_Title: string;
	Login_ForgottenPassword_Button: string;

	Home_Title: string;
	Home_Paragraph1: string;

	About_Title: string;
	About_Paragraph1: string;

	Career_Title: string;
	Career_Paragraph1: string;

	Technologies_CSharp_Title: string;
	Technologies_CSharp_Paragraph1: string;

	Technologies_Typescript_Title: string;
	Technologies_Typescript_Paragraph1: string;

	Assessments_Title: string;
	Assessments_Paragraph1: string;

	Chat_Title: string;
	Chat_Post: string;
	Chat_PostHelp: string;

	Menu_Home: string;
	Menu_About: string;
	Menu_Career: string;
	Menu_Technologies: string;
	Menu_Technologies_CSharp: string;
	Menu_Technologies_Typescript: string;
	Menu_Logout: string;
}

interface IUiTextManager {
	Current: IUiText;
}

class UiTextManager implements IUiTextManager {
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

	public ReapplyBindings(): void {
		ko.applyBindings(this);
	}
}