/// <reference path="../Page.ts" />

interface IPageRepository {
	Get(): Page[];
}

class PageRepository implements IPageRepository {
	public Get(): Page[] {
		var pages = new Array<Page>();

		pages.push(new Page(1, "Menu_Home", null, "home.html", "/"));
		pages.push(new Page(2, "Menu_About", null, "about.html", "/about"));
		pages.push(new Page(3, "Menu_Career", null, "career.html", "/career"));

		// Principles
		var principlesChildrenPages = new Array<Page>();

		principlesChildrenPages.push(new Page(7,  "Principles_DRY_Title", null, "principles_dry.html", "/principles_dry"));
		principlesChildrenPages.push(new Page(8,  "Principles_Automation_Title", null, "principles_automation.html", "/principles_automation"));
		principlesChildrenPages.push(new Page(9,  "Principles_CD_Title", null, "principles_cd.html", "/principles_continuousdelivery"));
		principlesChildrenPages.push(new Page(10, "Principles_Encapsulation_Title", null, "principles_encapsulation.html", "/principles_encapsulation"));
		principlesChildrenPages.push(new Page(11, "Principles_Inheritance_Title", null, "principles_inheritance.html", "/principles_inheritance"));
		principlesChildrenPages.push(new Page(12, "Principles_Composition_Title", null, "principles_composition.html", "/principles_compositionoverinheritance"));
		principlesChildrenPages.push(new Page(13, "Principles_Abstraction_Title", null, "principles_abstraction.html", "/principles_abstraction"));
		principlesChildrenPages.push(new Page(14, "Principles_Polymorphism_Title", null, "principles_polymorphism.html", "/principles_polymorphism"));
		principlesChildrenPages.push(new Page(15, "Principles_SR_Title", null, "principles_sr.html", "/principles_singleresponsibility"));
		principlesChildrenPages.push(new Page(16, "Principles_OC_Title", null, "principles_oc.html", "/principles_openclosed"));
		principlesChildrenPages.push(new Page(17, "Principles_Liskov_Title", null, "principles_liskov.html", "/principles_liskov"));
		principlesChildrenPages.push(new Page(18, "Principles_IS_Title", null, "principles_is.html", "/principles_interfacesegregation"));
		principlesChildrenPages.push(new Page(19, "Principles_DI_Title", null, "principles_di.html", "/principles_dependencyinversion"));

		var principlesPage = new Page(20, "Menu_Principles", principlesChildrenPages, "", "");
		pages.push(principlesPage);


		// Design patterns


		// Technologies	
		var technologiesChildrenPages = new Array<Page>();	
		technologiesChildrenPages.push(new Page(4, "Menu_Technologies_CSharp", null, "programming_csharp.html", "/programming_csharp"));
		technologiesChildrenPages.push(new Page(5, "Menu_Technologies_Typescript", null, "programming_typescript.html", "/programming_typescript"));

		var technologiesPage = new Page(6, "Menu_Technologies", technologiesChildrenPages, "", "");
		pages.push(technologiesPage);

		// Logout
		pages.push(new Page(200, "Menu_Logout", null, "", "/logout"));

		return pages;
	}
}