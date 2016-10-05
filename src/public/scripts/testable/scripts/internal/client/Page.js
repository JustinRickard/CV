/// <reference path="UiText.ts" />
// declare var StaticText: IUiTextManager;
var Page = (function () {
    function Page(id, displayNameKey, childrenPages, partialFileName, url, staticText, UsesClientSideRouting) {
        if (UsesClientSideRouting === void 0) { UsesClientSideRouting = true; }
        this.StaticText = staticText;
        this.ID = id;
        this.DisplayNameKey = displayNameKey;
        this.DisplayName = this.StaticText.Current[displayNameKey];
        this.UsesClientSideRouting = UsesClientSideRouting;
        if (childrenPages && childrenPages.length > 0) {
            this.ChildrenPages = childrenPages;
            this.PartialFileName = "";
            this.Url = "";
        }
        else {
            this.PartialFileName = partialFileName;
            this.Url = url;
        }
    }
    return Page;
}());
