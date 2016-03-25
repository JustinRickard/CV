/// <reference path="Enums.ts" />
/// <reference path="en-GB.ts" />
var UiText = (function () {
    // Other languages here
    function UiText(cultureCode) {
        // Define languages
        this.enGB = new en_gb();
        // Set current language
        this.SelectLanguage(cultureCode);
    }
    UiText.prototype.SelectLanguage = function (cultureCode) {
        switch (cultureCode) {
            case CultureCode.en_GB:
                this.Current = this.enGB;
                break;
            case CultureCode.fr_FR:
                break;
            case CultureCode.de_DE:
                break;
            case CultureCode.pt_BR:
                break;
            case CultureCode.es_ES:
                break;
        }
    };
    return UiText;
})();
