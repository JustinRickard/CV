/// <reference path="../Page.ts" />

interface IPageRepository {
	Get(): Page[];
}

class PageRepository implements IPageRepository {

	StaticText: IUiTextManager
	NextPageNumber: number;

	constructor(
		staticText: IUiTextManager
		) {
		this.StaticText = staticText;
		this.NextPageNumber = 1;
	}

	private NewPage(
		displayNameKey: string, 
		childrenPages: IPage[],
		partialFileName: string,
		url: string,
		usesClientSideRouting: boolean = true): IPage {

		var id = this.NextPageNumber;
		this.NextPageNumber++;
		return new Page(id, displayNameKey, childrenPages, partialFileName, url, this.StaticText, usesClientSideRouting);
	}

	public Get(): Page[] {
		var pages = new Array<Page>();

		pages.push(this.NewPage("Menu_Home", null, "home.html", "/"));
		pages.push(this.NewPage("Menu_About", null, "about.html", "/about"));
		pages.push(this.NewPage("Menu_Career", null, "career.html", "/career"));

		this.AddObjectOrientedPrinciplePages(pages);
		this.AddSolidPrinciplePages(pages);
		this.AddOtherPrinciplePages(pages);
		this.AddDesignPatternPages(pages);
		this.AddTechnologyPages(pages);
		this.AddDatabaseTechnologyPages(pages);
		this.AddJavascriptTechnologyPages(pages);

		return pages;
	}

	private AddObjectOrientedPrinciplePages(pages: Array<Page>): void {
		var ooPrinciplesChildrenPages = new Array<Page>();
		ooPrinciplesChildrenPages.push(this.NewPage("Principles_Encapsulation_Title", null, "principles_encapsulation.html", "/principles_encapsulation"));
		ooPrinciplesChildrenPages.push(this.NewPage("Principles_Inheritance_Title", null, "principles_inheritance.html", "/principles_inheritance"));
		ooPrinciplesChildrenPages.push(this.NewPage("Principles_Abstraction_Title", null, "principles_abstraction.html", "/principles_abstraction"));
		ooPrinciplesChildrenPages.push(this.NewPage("Principles_Polymorphism_Title", null, "principles_polymorphism.html", "/principles_polymorphism"));
		ooPrinciplesChildrenPages.push(this.NewPage("Principles_Composition_Title", null, "principles_composition.html", "/principles_compositionoverinheritance"));

		var ooPrinciplesPage = this.NewPage("Menu_OOPrinciples", ooPrinciplesChildrenPages, "", "");
		pages.push(ooPrinciplesPage);
	}

	private AddSolidPrinciplePages(pages: Array<Page>): void {
		var solidPrinciplesChildrenPages = new Array<Page>();
		solidPrinciplesChildrenPages.push(this.NewPage("Principles_SR_Title", null, "principles_sr.html", "/principles_singleresponsibility"));
		solidPrinciplesChildrenPages.push(this.NewPage("Principles_OC_Title", null, "principles_oc.html", "/principles_openclosed"));
		solidPrinciplesChildrenPages.push(this.NewPage("Principles_Liskov_Title", null, "principles_liskov.html", "/principles_liskov"));
		solidPrinciplesChildrenPages.push(this.NewPage("Principles_IS_Title", null, "principles_is.html", "/principles_interfacesegregation"));
		solidPrinciplesChildrenPages.push(this.NewPage("Principles_DI_Title", null, "principles_di.html", "/principles_dependencyinversion"));

		var solidPrinciplesPage = this.NewPage("Menu_SolidPrinciples", solidPrinciplesChildrenPages, "", "");
		pages.push(solidPrinciplesPage);
	}

	private AddOtherPrinciplePages(pages: Array<Page>): void {
		var principlesChildrenPages = new Array<Page>();

		principlesChildrenPages.push(this.NewPage("Principles_DRY_Title", null, "principles_dry.html", "/principles_dry"));
		principlesChildrenPages.push(this.NewPage("Principles_Automation_Title", null, "principles_automation.html", "/principles_automation"));
		principlesChildrenPages.push(this.NewPage("Principles_CD_Title", null, "principles_cd.html", "/principles_continuousdelivery"));
		
		var principlesPage = this.NewPage("Menu_Principles", principlesChildrenPages, "", "");
		pages.push(principlesPage);
	}

	private AddDesignPatternPages(pages: Array<Page>): void {
		var designPatternPages = new Array<Page>();

		designPatternPages.push(this.NewPage("DesignPatterns_Observer_Title", null, "design_pattern_observer.html", "/design_pattern_observer"));
		designPatternPages.push(this.NewPage("DesignPatterns_Mediator_Title", null, "design_pattern_mediator.html", "/design_pattern_mediator"));
		designPatternPages.push(this.NewPage("DesignPatterns_ChainOfResponsibility_Title", null, "design_pattern_chain_of_responsibility.html", "/design_pattern_chain_of_responsibility"));
		designPatternPages.push(this.NewPage("DesignPatterns_Factory_Title", null, "design_pattern_factory.html", "/design_pattern_factory"));
		designPatternPages.push(this.NewPage("DesignPatterns_Facade_Title", null, "design_pattern_facade.html", "/design_pattern_facade"));

		var designPatternPage = this.NewPage("Menu_DesignPatterns", designPatternPages, "","");
		pages.push(designPatternPage);
	}

	private AddTechnologyPages(pages: Array<Page>): void {
		var technologiesChildrenPages = new Array<Page>();	

		technologiesChildrenPages.push(this.NewPage("Technologies_CSharp_Title", null, "programming_csharp.html", "/programming_csharp"));
		technologiesChildrenPages.push(this.NewPage("Technologies_iText_Title", null, "programming_itext.html", "/programming_itext"));
		technologiesChildrenPages.push(this.NewPage("Technologies_NUnit_Title", null, "programming_nunit.html", "/programming_nunit"));
		technologiesChildrenPages.push(this.NewPage("Technologies_MVC_Title", null, "programming_mvc.html", "/programming_mvc"));
		technologiesChildrenPages.push(this.NewPage("Technologies_WebForms_Title", null, "programming_webforms.html", "/programming_webforms"));
		technologiesChildrenPages.push(this.NewPage("Technologies_PowerShell_Title", null, "programming_powershell.html", "/programming_powershell"));

		var technologiesPage = this.NewPage("Menu_ServerTechnologies", technologiesChildrenPages, "", "");
		pages.push(technologiesPage);
	}

	private AddDatabaseTechnologyPages(pages: Array<Page>): void {
		var dbTechnologiesChildrenPages = new Array<Page>();	

		dbTechnologiesChildrenPages.push(this.NewPage("Technologies_SqlServer_Title", null, "programming_sqlserver.html", "/programming_sqlserver"));
		dbTechnologiesChildrenPages.push(this.NewPage("Technologies_MySql_Title", null, "programming_mysql.html", "/programming_mysql"));
		dbTechnologiesChildrenPages.push(this.NewPage("Technologies_MongoDB_Title", null, "programming_mongodb.html", "/programming_mongodb"));

		var dbTechnologiesPage = this.NewPage("Menu_DatabaseTechnologies", dbTechnologiesChildrenPages, "", "");
		pages.push(dbTechnologiesPage);
	}

	private AddJavascriptTechnologyPages(pages: Array<Page>): void {
		var jsTechnologiesChildrenPages = new Array<Page>();	
		
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Typescript_Title", null, "programming_typescript.html", "/programming_typescript"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Knockout_Title", null, "programming_knockout.html", "/programming_knockout"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_React_Title", null, "programming_react.html", "/programming_react"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Angular1_Title", null, "programming_angular1.html", "/programming_angular1"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Angular2_Title", null, "programming_angular2.html", "/programming_angular2"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Jasmine_Title", null, "programming_jasmine.html", "/programming_jasmine"));
		jsTechnologiesChildrenPages.push(this.NewPage("Technologies_Mocha_Title", null, "programming_mocha.html", "/programming_mocha"));

		var jsTechnologiesPage = this.NewPage("Menu_JavascriptTechnologies", jsTechnologiesChildrenPages, "", "");
		pages.push(jsTechnologiesPage);
	}
}