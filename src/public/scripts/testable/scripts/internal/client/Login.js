/// <reference path="UiText.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
$(document).ready(function () {
    // Set static text
    StaticText = new UiTextManager(CultureCode.en_GB);
    ko.applyBindings(StaticText);
});
