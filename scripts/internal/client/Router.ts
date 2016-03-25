/// <reference path="../../external/DefinitelyTyped/routie/routie.d.ts" />
// <reference path="AppModel.ts" />
// <reference path="Enums.ts" />

declare var Model: AppModel;

class Router {
	constructor () {

	}

	public Initialise() {
		routie({
			'/': () => {
				Model.SetPage(Page.Home);
			},
			'/about': () => {
				Model.SetPage(Page.About);
			},
			'/career': () => {
				Model.SetPage(Page.Career);
			},
			'/programming_csharp': () => {
				Model.SetPage(Page.Programming_CSharp);
			},
			'/programming_typescript': () => {
				Model.SetPage(Page.Programming_Typescript);
			}
		});
	}

	public NavigateTo (page: Page) {
		switch (page) {
			case Page.About:
				routie('/about');
				break;
			case Page.Career:
				routie('/career');
				break;
			case Page.Programming_CSharp:
				routie('/programming_csharp');
				break;
			case Page.Programming_Typescript:
				routie('/programming_typescript');
				break;
			default:
				routie('/');
				break;
		}
	}
}