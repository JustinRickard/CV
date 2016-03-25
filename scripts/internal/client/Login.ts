/// <reference path="UiText.ts" />
/// <reference path="../../external/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />

var StaticText: UiText;

$(document).ready(() => {
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);

    ko.applyBindings(StaticText);
});