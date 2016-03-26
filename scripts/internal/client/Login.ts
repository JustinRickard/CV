/// <reference path="UiText.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />

var StaticText: UiText;

$(document).ready(() => {
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);

    ko.applyBindings(StaticText);
});