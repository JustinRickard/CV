/// <reference path="../Page.ts" />

interface IPageRepository {
	Get(): Page[];
}

class PageRepository implements IPageRepository {

	StaticText: IUiTextManager

	constructor(
		staticText: IUiTextManager
		) {
		this.StaticText = staticText;
	}

	private NewPage(id: number,
		displayNameKey: string, 
		childrenPages: IPage[],
		partialFileName: string,
		url: string,
		usesClientSideRouting: boolean = true): IPage {

		return new Page(id, displayNameKey, childrenPages, partialFileName, url, this.StaticText, usesClientSideRouting);
	}

	public Get(): Page[] {
		var pages = new Array<Page>();

		pages.push(this.NewPage(1, "Menu_Home", null, "home.html", "/"));
		pages.push(this.NewPage(2, "Menu_About", null, "about.html", "/about"));
		pages.push(this.NewPage(3, "Menu_Career", null, "career.html", "/career"));

		// Principles
		var principlesChildrenPages = new Array<Page>();

		principlesChildrenPages.push(this.NewPage(7,  "Principles_DRY_Title", null, "principles_dry.html", "/principles_dry"));
		principlesChildrenPages.push(this.NewPage(8,  "Principles_Automation_Title", null, "principles_automation.html", "/principles_automation"));
		principlesChildrenPages.push(this.NewPage(9,  "Principles_CD_Title", null, "principles_cd.html", "/principles_continuousdelivery"));
		principlesChildrenPages.push(this.NewPage(10, "Principles_Encapsulation_Title", null, "principles_encapsulation.html", "/principles_encapsulation"));
		principlesChildrenPages.push(this.NewPage(11, "Principles_Inheritance_Title", null, "principles_inheritance.html", "/principles_inheritance"));
		principlesChildrenPages.push(this.NewPage(12, "Principles_Composition_Title", null, "principles_composition.html", "/principles_compositionoverinheritance"));
		principlesChildrenPages.push(this.NewPage(13, "Principles_Abstraction_Title", null, "principles_abstraction.html", "/principles_abstraction"));
		principlesChildrenPages.push(this.NewPage(14, "Principles_Polymorphism_Title", null, "principles_polymorphism.html", "/principles_polymorphism"));
		principlesChildrenPages.push(this.NewPage(15, "Principles_SR_Title", null, "principles_sr.html", "/principles_singleresponsibility"));
		principlesChildrenPages.push(this.NewPage(16, "Principles_OC_Title", null, "principles_oc.html", "/principles_openclosed"));
		principlesChildrenPages.push(this.NewPage(17, "Principles_Liskov_Title", null, "principles_liskov.html", "/principles_liskov"));
		principlesChildrenPages.push(this.NewPage(18, "Principles_IS_Title", null, "principles_is.html", "/principles_interfacesegregation"));
		principlesChildrenPages.push(this.NewPage(19, "Principles_DI_Title", null, "principles_di.html", "/principles_dependencyinversion"));

		var principlesPage = this.NewPage(20, "Menu_Principles", principlesChildrenPages, "", "");
		pages.push(principlesPage);

		// Design patterns
		var designPatternPages = new Array<Page>();

		designPatternPages.push(this.NewPage(21, "DesignPatterns_Observer_Title", null, "design_pattern_observer.html", "/design_pattern_observer"));
		designPatternPages.push(this.NewPage(22, "DesignPatterns_Mediator_Title", null, "design_pattern_mediator.html", "/design_pattern_mediator"));
		designPatternPages.push(this.NewPage(23, "DesignPatterns_ChainOfResponsibility_Title", null, "design_pattern_chain_of_responsibility.html", "/design_pattern_chain_of_responsibility"));
		designPatternPages.push(this.NewPage(24, "DesignPatterns_Factory_Title", null, "design_pattern_factory.html", "/design_pattern_factory"));
		designPatternPages.push(this.NewPage(25, "DesignPatterns_Facade_Title", null, "design_pattern_facade.html", "/design_pattern_facade"));

		var designPatternPage = this.NewPage(26, "Menu_DesignPatterns", designPatternPages, "","");
		pages.push(designPatternPage);
		
		// Technologies	
		var technologiesChildrenPages = new Array<Page>();	
		technologiesChildrenPages.push(this.NewPage(4, "Technologies_CSharp_Title", null, "programming_csharp.html", "/programming_csharp"));
		technologiesChildrenPages.push(this.NewPage(5, "Technologies_Typescript_Title", null, "programming_typescript.html", "/programming_typescript"));

		var technologiesPage = this.NewPage(6, "Menu_Technologies", technologiesChildrenPages, "", "");
		pages.push(technologiesPage);

		return pages;
	}
}