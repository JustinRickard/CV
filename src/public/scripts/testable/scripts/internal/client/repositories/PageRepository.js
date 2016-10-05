/// <reference path="../Page.ts" />
var PageRepository = (function () {
    function PageRepository(staticText) {
        this.StaticText = staticText;
    }
    PageRepository.prototype.NewPage = function (id, displayNameKey, childrenPages, partialFileName, url, usesClientSideRouting) {
        if (usesClientSideRouting === void 0) { usesClientSideRouting = true; }
        return new Page(id, displayNameKey, childrenPages, partialFileName, url, this.StaticText, usesClientSideRouting);
    };
    PageRepository.prototype.Get = function () {
        var pages = new Array();
        pages.push(this.NewPage(1, "Menu_Home", null, "home.html", "/"));
        pages.push(this.NewPage(2, "Menu_About", null, "about.html", "/about"));
        pages.push(this.NewPage(3, "Menu_Career", null, "career.html", "/career"));
        // Principles
        var principlesChildrenPages = new Array();
        principlesChildrenPages.push(this.NewPage(7, "Principles_DRY_Title", null, "principles_dry.html", "/principles_dry"));
        principlesChildrenPages.push(this.NewPage(8, "Principles_Automation_Title", null, "principles_automation.html", "/principles_automation"));
        principlesChildrenPages.push(this.NewPage(9, "Principles_CD_Title", null, "principles_cd.html", "/principles_continuousdelivery"));
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
        // Technologies	
        var technologiesChildrenPages = new Array();
        technologiesChildrenPages.push(this.NewPage(4, "Menu_Technologies_CSharp", null, "programming_csharp.html", "/programming_csharp"));
        technologiesChildrenPages.push(this.NewPage(5, "Menu_Technologies_Typescript", null, "programming_typescript.html", "/programming_typescript"));
        var technologiesPage = this.NewPage(6, "Menu_Technologies", technologiesChildrenPages, "", "");
        pages.push(technologiesPage);
        // Logout
        pages.push(this.NewPage(200, "Menu_Logout", null, "", "/logout", false));
        return pages;
    };
    return PageRepository;
}());
