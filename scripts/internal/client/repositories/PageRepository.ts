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
		
		var c_sharp = new Page(4, "Menu_Technologies_CSharp", null, "programming_csharp.html", "/programming_csharp");
		var typescript = new Page(5, "Menu_Technologies_Typescript", null, "programming_typescript.html", "/programming_typescript");
		var technologiesChildrenPages = new Array<Page>();
		technologiesChildrenPages.push(c_sharp);
		technologiesChildrenPages.push(typescript);
		var technologiesPage = new Page(6, "Menu_Technologies", [c_sharp, typescript], "", "");
		pages.push(technologiesPage);

		pages.push(new Page(200, "Menu_Logout", null, "", "/logout"));

		return pages;
	}
}