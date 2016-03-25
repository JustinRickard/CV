var AssessmentType;
(function (AssessmentType) {
    AssessmentType[AssessmentType["SJT"] = 1] = "SJT";
    AssessmentType[AssessmentType["BSQ"] = 2] = "BSQ";
})(AssessmentType || (AssessmentType = {}));
var CultureCode;
(function (CultureCode) {
    CultureCode[CultureCode["en_GB"] = 1] = "en_GB";
    CultureCode[CultureCode["fr_FR"] = 2] = "fr_FR";
    CultureCode[CultureCode["de_DE"] = 3] = "de_DE";
    CultureCode[CultureCode["pt_BR"] = 4] = "pt_BR";
    CultureCode[CultureCode["es_ES"] = 5] = "es_ES";
})(CultureCode || (CultureCode = {}));
var HttpVerb;
(function (HttpVerb) {
    HttpVerb[HttpVerb["GET"] = 1] = "GET";
    HttpVerb[HttpVerb["POST"] = 2] = "POST";
})(HttpVerb || (HttpVerb = {}));
var MenuItemLevel;
(function (MenuItemLevel) {
    MenuItemLevel[MenuItemLevel["One"] = 1] = "One";
    MenuItemLevel[MenuItemLevel["Two"] = 2] = "Two";
})(MenuItemLevel || (MenuItemLevel = {}));
var MessageDisplayStatus;
(function (MessageDisplayStatus) {
    MessageDisplayStatus[MessageDisplayStatus["None"] = 1] = "None";
    MessageDisplayStatus[MessageDisplayStatus["Warning"] = 2] = "Warning";
    MessageDisplayStatus[MessageDisplayStatus["Error"] = 3] = "Error";
})(MessageDisplayStatus || (MessageDisplayStatus = {}));
var Page;
(function (Page) {
    Page[Page["Home"] = 1] = "Home";
    Page[Page["About"] = 2] = "About";
    Page[Page["Career"] = 3] = "Career";
    Page[Page["Programming_CSharp"] = 4] = "Programming_CSharp";
    Page[Page["Programming_Typescript"] = 5] = "Programming_Typescript";
})(Page || (Page = {}));

/// <reference path="UiText.ts" />
/// <reference path="../../external/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />
var StaticText;
$(document).ready(function () {
    // Set static text
    StaticText = new UiText(CultureCode.en_GB);
    ko.applyBindings(StaticText);
});

/// <reference path="Enums.ts" />
/// <reference path="en-GB.ts" />
/// <reference path="../../external/DefinitelyTyped/knockout/knockout.d.ts" />
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
    UiText.prototype.ReapplyBindings = function () {
        ko.applyBindings(this);
    };
    return UiText;
})();

/// <reference path="UiText.ts" />
var en_gb = (function () {
    function en_gb() {
        this.Banner_Logo = "JR";
        this.Banner_Slogan1 = "Create";
        this.Banner_Slogan2 = "Improve";
        this.Banner_Slogan3 = "Inspire";
        this.Login_Title = "Login";
        this.Login_Username = "Username";
        this.Login_Password = "Password";
        this.Login_LoginButton = "Log me in!";
        this.Login_Register_Title = "Register";
        this.Login_Register_Button = "Sign me up!";
        this.Login_ForgottenPassword_Button = "Remind me!";
        this.Login_ForgottenPassword_Title = "Forgotten password?";
        this.Tabs_Home = "About me";
        this.Tabs_Jobs = "Jobs";
        this.Tabs_Assessments = "Assessments";
        this.Tabs_LiveChat = "Live Chat";
        this.Tabs_Programming = "Programming";
        this.Home_Title = "Who am I?";
        this.Home_Paragraph1 = "TODO: Home";
        this.About_Title = "About me";
        this.About_Paragraph1 = "TODO: About me";
        this.Career_Title = "My Career";
        this.Career_Paragraph1 = "TODO: Career intro";
        this.ProgrammingCSharp_Title = "C#";
        this.ProgrammingCSharp_Paragraph1 = "TODO: C# intro";
        this.ProgrammingTypescript_Title = "TODO: Typescript";
        this.ProgrammingTypescript_Paragraph1 = "TODO: C# intro";
        this.Assessments_Title = "Assessments";
        this.Assessments_Paragraph1 = "TODO: Assessment intro";
        this.Chat_Title = "Chat live with other members who are logged on!";
        this.Chat_Post = "Post";
        this.Chat_PostHelp = "Type your post here";
        this.Menu_Home = "Home";
        this.Menu_About = "About me";
        this.Menu_Career = "My Career";
        this.Menu_Programming = "Programming";
        this.Menu_Programming_CSharp = "C#";
        this.Menu_Programming_Typescript = "Typescript";
    }
    return en_gb;
})();
