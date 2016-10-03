/// <reference path="UiText.ts" />
/// <reference path="../shared/models/Enums.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />


declare var StaticText: IUiTextManager;

$(document).ready(() => {
    // Set static text
    StaticText = new UiTextManager(CultureCode.en_GB);

    ko.applyBindings(StaticText);
});