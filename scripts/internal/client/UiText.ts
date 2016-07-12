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
	Home_P1: string;
	Home_P1_B1: string;
	Home_P1_B2: string;
	Home_P1_B3: string;
	Home_P1_B4: string;
	Home_P1_B5: string;
	Home_P2: string;

	About_Title: string;
	About_P1: string;
	About_P1_B1: string;
	About_P1_B1_P1: string;
	About_P1_B2: string;
	About_P1_B2_P1: string;
	About_P1_B3: string;
	About_P1_B3_P1: string;
	About_P1_B4: string;
	About_P1_B4_P1: string;
	About_P1_B5: string;
	About_P1_B5_P1: string;

	Career_Title: string;
	Career_P1: string;

	DesignPatterns_Observer_Title: string;
	DesignPatterns_Observer_P1: string;
	DesignPatterns_Observer_P1_B1: string;
	DesignPatterns_Observer_P1_B2: string;
	DesignPatterns_Observer_P1_B3: string;
	DesignPatterns_Observer_P1_B4: string;
	DesignPatterns_Observer_P1_B5: string;

	DesignPatterns_Mediator_Title: string;
	DesignPatterns_Mediator_P1: string;
	DesignPatterns_Mediator_P1_B1: string;
	DesignPatterns_Mediator_P1_B2: string;
	DesignPatterns_Mediator_P1_B3: string;
	DesignPatterns_Mediator_P2: string;

	DesignPatterns_ChainOfResponsibility_Title: string;
	DesignPatterns_ChainOfResponsibility_Paragraph1: string;

	DesignPatterns_Factory_Title: string;
	DesignPatterns_Factory_Paragraph1: string;

	DesignPatterns_Facade_Title: string;
	DesignPatterns_Facade_Paragraph1: string;

	Principles_DRY_Title: string;
	Principles_DRY_Paragraph1: string;

	Principles_Automation_Title: string;
	Principles_Automation_Paragraph1: string;

	Principles_CD_Title: string;
	Principles_CD_Paragraph1: string;	

	Principles_Encapsulation_Title: string;
	Principles_Encapsulation_Paragraph1: string;

	Principles_Inheritance_Title: string;
	Principles_Inheritance_Paragraph1: string;

	Principles_Composition_Title: string;
	Principles_Composition_Paragraph1: string;

	Principles_Abstraction_Title: string;
	Principles_Abstraction_Paragraph1: string;

	Principles_Polymorphism_Title: string;
	Principles_Polymorphism_Paragraph1: string;

	Principles_SR_Title: string;
	Principles_SR_Paragraph1: string;

	Principles_OC_Title: string;
	Principles_OC_Paragraph1: string;

	Principles_Liskov_Title: string;
	Principles_Liskov_Paragraph1: string;

	Principles_IS_Title: string;
	Principles_IS_Paragraph1: string;

	Principles_DI_Title: string;
	Principles_DI_Paragraph1: string;

	Technologies_Typescript_Title: string;
	Technologies_Typescript_Paragraph1: string;

	Technologies_CSharp_Title: string;
	Technologies_CSharp_Paragraph1: string;

	Assessments_Title: string;
	Assessments_Paragraph1: string;

	Chat_Title: string;
	Chat_Post: string;
	Chat_PostHelp: string;

	Menu_Home: string;
	Menu_About: string;
	Menu_Career: string;
	Menu_Principles: string;
	Menu_Technologies: string;
	Menu_DesignPatterns: string;
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