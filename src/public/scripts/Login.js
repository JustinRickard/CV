/// <reference path="UiText.ts" />
/// <reference path="../shared/models/Enums.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
$(document).ready(function () {
    // Set static text
    StaticText = new UiTextManager(CultureCode.en_GB);
    ko.applyBindings(StaticText);
});

/// <reference path="../shared/models/Enums.ts" />
/// <reference path="en-GB.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
var UiTextManager = (function () {
    // Other languages here
    function UiTextManager(cultureCode) {
        // Define languages
        this.enGB = new en_gb();
        // Set current language
        this.SelectLanguage(cultureCode);
    }
    UiTextManager.prototype.SelectLanguage = function (cultureCode) {
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
    UiTextManager.prototype.ReapplyBindings = function () {
        ko.applyBindings(this);
    };
    return UiTextManager;
}());

/// <reference path="UiText.ts" />
var en_gb = (function () {
    function en_gb() {
        this.Banner_Logo = "Justin R";
        this.Banner_Slogan1 = "Create";
        this.Banner_Slogan2 = "Improve";
        this.Banner_Slogan3 = "Inspire";
        this.Footer_Copyright = "© Justin Rickard " + new Date().getFullYear();
        this.Login_Title = "Login";
        this.Login_Username = "Username";
        this.Login_Password = "Password";
        this.Login_LoginButton = "Log me in!";
        this.Login_Register_Title = "Register";
        this.Login_Register_Button = "Sign me up!";
        this.Login_ForgottenPassword_Button = "Remind me!";
        this.Login_ForgottenPassword_Title = "Forgotten password?";
        this.Home_Title = "Welcome!";
        this.Home_P1 = "In this online CV app, I mention:";
        this.Home_P1_B1 = "How I like to work";
        this.Home_P1_B2 = "My previous jobs";
        this.Home_P1_B3 = "Principles of software development";
        this.Home_P1_B4 = "Design patterns";
        this.Home_P1_B5 = "Technologies I am familiar with";
        this.Home_P2 = "Use the menu to navigate to each page.";
        this.About_Title = "About me";
        this.About_P1 = "As a software developer, these are my top 5 philosophies:";
        this.About_P1_B1 = "Automation";
        this.About_P1_B1_P1 = "In order to maximise productivity, any repeatedly performed tasks should be automated so you can spend more time developing. This can often be done by writing scripts, such as PowerShell on Windows and Bash on Unix and Linux. For more complex tasks such as automated application deployment, external tools may need to be used such as TeamCity, Jenkins or Team Foundation Server (TFS).";
        this.About_P1_B2 = "Refactoring";
        this.About_P1_B2_P1 = "Code can very easily become messy due to many factors. It is important to refactor your newly written code as you go along, and before each commit to check whether anything can be refactored or made more generic. Repeated code is costly to maintain, so look out for it. And if you spot it, refactor it!";
        this.About_P1_B3 = "Laying a solid foundation";
        this.About_P1_B3_P1 = "It is very tempting to quickly knock together a working feature or application to either show that you are making good progress or to give an early demonstration to stakeholders. While this is sometimes necessary, it should be avoided when possible. From experience, it is always a lot quicker to lay a sturdy foundation first, then write the rest of your code on top of it. The problem with skipping the foundation laying is that once your code works, you then need to dig it up to ensure it is written properly, which often takes more effort than you had predicted. Another disadvantage is that some parts of the foundation never get done as the project deadline looms... and the final product is less robust than you had intended. The larger the project, the more important it is to lay good foundations right from the start.";
        this.About_P1_B4 = "Use up-to-date technology";
        this.About_P1_B4_P1 = "It is very common for a technology to be used in a software project, and as the software ages the technology used becomes out of date. Often this is because it can be difficult to change, more so if your code is tightly coupled. The main problem with out-of-date technology is that there is little or no support for it, and often there will be bugs that are fixed in a later release. ";
        this.About_P1_B5 = "Be organised";
        this.About_P1_B5_P1 = "Working in an organised manner is necessary in order to for you and your team to work efficiently. For me, being organised includes doing the following:";
        this.About_P1_B5_P1_B1 = "Regularly writing down updates on your tickets";
        this.About_P1_B5_P1_B2 = "Keeping colleagues, stakeholders and line managers up-to-date";
        this.About_P1_B5_P1_B3 = "Writing documentation for any new feature you develop";
        this.About_P1_B5_P1_B4 = "Put your code files into separate folders where appropriate";
        this.About_P1_B5_P1_B5 = "Regularly commit changes to source control";
        this.About_P1_B5_P1_B6 = "Ensure any important files you have are backed up";
        this.About_P1_B5_P1_B7 = "Keeping code files small and manageable";
        this.Experience_Title = "Experience";
        this.Experience_Year = "year";
        this.Experience_Years = "years";
        this.Experience_FrontEnd = "Front-End";
        this.Experience_Database = "Database";
        this.Experience_Server = "Server";
        this.Career_Title = "My Career";
        this.Career_P1 = "Take a look at my professional experience using the timeline below.";
        this.DesignPatterns_Observer_Title = "Observer";
        this.DesignPatterns_Observer_P1 = "The observer pattern facilitates communication between different parts of a system in the following way:";
        this.DesignPatterns_Observer_P1_B1 = "Objects that need to be informed of a change are called \"obsevers\"";
        this.DesignPatterns_Observer_P1_B2 = "Observers register themselves with an object that performs a certain action (subject)";
        this.DesignPatterns_Observer_P1_B3 = "When the subject completes an action, a notify() method is run";
        this.DesignPatterns_Observer_P1_B4 = "The notify method informs each registered observer of the action";
        this.DesignPatterns_Observer_P1_B5 = "Each observer processes this message in whatever way they need to";
        this.DesignPatterns_Mediator_Title = "Mediator";
        this.DesignPatterns_Mediator_P1 = "The mediator pattern can be thought of as similar to the observer pattern but allows for more decoupled code:";
        this.DesignPatterns_Mediator_P1_B1 = "Observers register with the mediator on a channel.";
        this.DesignPatterns_Mediator_P1_B2 = "When subjects complete an action, they inform the mediator.";
        this.DesignPatterns_Mediator_P1_B3 = "When the mediator receives an update from a subject, it passes it on to the observers of that channel.";
        this.DesignPatterns_Mediator_P2 = "A major benefit of the mediator pattern is that it can vastly simplify the communication between different parts of your application.";
        this.DesignPatterns_ChainOfResponsibility_Title = "Chain of Responsibility";
        this.DesignPatterns_ChainOfResponsibility_P1 = "The chain of responsibily pattern:";
        this.DesignPatterns_ChainOfResponsibility_P1_B1 = "Provides decoupling of the sender of a request and receiver";
        this.DesignPatterns_ChainOfResponsibility_P1_B2 = "Gives more than one object a chance to handle the request";
        this.DesignPatterns_ChainOfResponsibility_P1_B3 = "The request is passed along the chain until it is handled";
        this.DesignPatterns_Factory_Title = "Factory";
        this.DesignPatterns_Factory_P1 = "The factory pattern:";
        this.DesignPatterns_Factory_P1_B1 = "Is a creational design pattern";
        this.DesignPatterns_Factory_P1_B2 = "Hides the creation logic from the client";
        this.DesignPatterns_Factory_P1_B3 = "Newly created objects implement a common interface";
        this.DesignPatterns_Facade_Title = "Facade";
        this.DesignPatterns_Facade_P1 = "The facade pattern:";
        this.DesignPatterns_Facade_P1_B1 = "Provides a simplified interface to a larger body of code.";
        this.DesignPatterns_Facade_P1_B2 = "Defines a higher-level interface that  makes a subsystem easier to use";
        this.Principles_DRY_Title = "Don't repeat yourself";
        this.Principles_DRY_Paragraph1 = "For me, DRY is the most important principle to follow when programming for the following reasons:";
        this.Principles_DRY_Paragraph1_B1 = "Code will be more easily maintainable as logic is in one place only";
        this.Principles_DRY_Paragraph1_B2 = "Code can very easily be split out to other files if necessary";
        this.Principles_DRY_Paragraph1_B3 = "Code will be more legible and nice to work with";
        this.Principles_DRY_Paragraph1_B4 = "Files and projects will not grow unnecessarily large";
        this.Principles_DRY_Paragraph1_B5 = "Bugs will appear less frequently if changes need to be made in one place only";
        this.Principles_Automation_Title = "Automation";
        this.Principles_Automation_Paragraph1 = "It is important for a software team's productivity for all repeated tasks to be automated. While an initial effort is required to script up, test and maintain these tasks, much time will be saved in the long-term.";
        this.Principles_Automation_Paragraph2 = "The following are common tasks for a software development team that should normally be automated";
        this.Principles_Automation_Paragraph2_B1 = "Building an application";
        this.Principles_Automation_Paragraph2_B2 = "Deploying an application";
        this.Principles_Automation_Paragraph2_B3 = "Compiling CSS and Javascript when source files are changed in a development environment";
        this.Principles_Automation_Paragraph2_B4 = "Regular data retrieval";
        this.Principles_CD_Title = "Continuous delivery";
        this.Principles_CD_Paragraph1 = "The terms \"Continuous Delivery\" and \"Continuous Integration\" have become very fashionable terms recently, with many people having their own opinions on their meanings. For me, Continous Delivery means that our software project is always in a position where it could be deployed (or delivered) if needed. This can be achieved by";
        this.Principles_CD_Paragraph1_B1 = "Using a build server such as TeamCity, Jenkins or Team Foundation Server (TFS)";
        this.Principles_CD_Paragraph1_B2 = "Build server alerts the team when a commit breaks the build or causes any automated tests to fail";
        this.Principles_CD_Paragraph1_B3 = "Ensuring the team has a culture of fixing the build as a first priority, and not to make commits on top of a broken build";
        this.Principles_CD_Paragraph1_B4 = "Preventing a commit to the mainline trunk if it breaks the build or causes an automated test to fail (although some teams find this overly restrictive)";
        this.Principles_Encapsulation_Title = "Encapsulation";
        this.Principles_Encapsulation_Paragraph1 = "Encapsulation is a principle of object-oriented programming that is about hiding the inner workings of a class, while providing a simple interface to interact with it.";
        this.Principles_Encapsulation_Paragraph2 = "For example we may have a Person class with a method EatBiscuit(biscuit). Within the EatBiscuit method, there may be several inner methods being called in succession, such as OpenBiscuitTin(), GetBiscuit(biscuit), ShoveInMouth(biscuit). By wrapping up these 3 consecutive methods into one method, we make the interaction with the Person object simpler.";
        this.Principles_Inheritance_Title = "Inheritance";
        this.Principles_Inheritance_Paragraph1 = "Inheritance is an object-oriented principle that allows re-use of functionality by providing a hierarchical class structure.";
        this.Principles_Inheritance_Paragraph2 = "For example: cars, vans, lorries, buses, bikes and motorbikes are all forms of vehicles. Therefore it may make sense to have a base class called Vehicle that all of these could inherit. The vehicle class could have common methods such as Accelerate, Brake, Reverse, Turn as well as common properties such as NumerOfSeats, NumberOfWheels, etc.";
        this.Principles_Inheritance_Paragraph3 = " The use of class inheritance is actually becoming less popular as the use of Interface Composition is becoming more popular.";
        this.Principles_Composition_Title = "Interface composition";
        this.Principles_Composition_Paragraph1 = "Interface composition allows classes to have multiple behaviours by implementing multiple interfaces. This has become more popular in recent years and by many preferred over inheritance in order to achieve polymorphism.";
        this.Principles_Composition_Paragraph2 = "For example: cars, vans, lorries, buses, bikes and motorbikes are all vehicles. Instead of having them inherit a base class called Vehicle, each class could inherit behaviours via an interface. For example they may all implement the Accelerate, Brake and Turn behaviours. However it could be that only bikes and motorbikes implement the Wheelie behaviour, and that all except these 2 implement the Load/Unload behaviour.";
        this.Principles_Abstraction_Title = "Abstraction";
        this.Principles_Abstraction_Paragraph1 = "Abstraction can be defined as the concept of describing something in simpler terms, focusing only on what is important or relevant.";
        this.Principles_Abstraction_Paragraph2 = "For example, we may have a process that deals with Vehicles objects, without being concerned exactly what type of vehicle it is, since all vehicles have certain properties in common. The Vehicle class may be an abstract class. We could use the technique of Encapsulation to abstract away the complexities of the inner workings of the different classes we interact with.";
        this.Principles_Polymorphism_Title = "Polymorphism";
        this.Principles_Polymorphism_Paragraph1 = "Polymorphism is the ability to present the same interface for different types.";
        this.Principles_Polymorphism_Paragraph2 = "For example, a car class and a bus class would both have a method \"Accelerate()\". However the implementation for each may be different. Each of these classes may implement the IVehicle interface which ensures the Accelerate method exists. The client code would therefore be able to run vehicle.Accelerate() on each item, which would in fact call two different methods, one on the car class and one on the bus class.";
        this.Principles_SR_Title = "Single responsibility principle";
        this.Principles_SR_Paragraph1 = "The Single Responsibility Principle states that every module or class should have one job to do, and one only. As soon as a class is doing more than one job, it is violating this principle.";
        this.Principles_SR_Paragraph2 = "Adhering to this principle makes your software much easier to maintain and change, as any change will only need to be made in one place.";
        this.Principles_SR_Paragraph3 = "For example, your program logs errors to the server when they occur using NLog. Within each class, we could have code along the lines of \"_logger = new NLog.Logger()\" for instantiating the logger, as well as \"_logger.Error(errorMessage)\". Now imagine that you need to change the logging library to another. You would need to change each and every class where logging code exists, to use the new library and its different methods.";
        this.Principles_SR_Paragraph4 = "If we had created a Logger class which handles all the logging, then when it comes to changing the logging library, we would simply need to change the Logger class, and nothing else. This is how adhering to this principle can vastly simplify the maintenance of software.";
        this.Principles_OC_Title = "Open closed principle";
        this.Principles_OC_Paragraph1 = "The Open Closed principle states that modules and classes should be open for extension, but closed for modification.";
        this.Principles_OC_Paragraph2 = "The benefit for this is that your classes and modules may already be in use and depended on by client applications, so avoiding changes avoids creating new bugs. Changing the name of a function for example, could result in a client application breaking. So if we require a change to an existing function, we could create a new function and extend the existing one.";
        this.Principles_Liskov_Title = "Liskov's substitution principle";
        this.Principles_Liskov_Paragraph1 = "Liskov's Substitution Principle (LSP) states that \"Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.\"";
        this.Principles_Liskov_Paragraph2 = "It provides a guideline on when it is appropriate to extend classes, and when an alternative such as composition is best.";
        this.Principles_Liskov_Paragraph3 = "A common example of this is with the shapes Rectangle and Square. It could be said that a Square class should inherit from the Rectangle class because a square is a rectangle, albeit with an equal height and width. However complications can arise with regards to behaviour, since a method \"SetWidth() on a rectangle would affect the width only, however on a square it should also affect the height. As such, the SetWidth() method becomes inappropriate for a square.\" As such, Square should probably not inherit from Rectangle.";
        this.Principles_IS_Title = "Interface segregation principle";
        this.Principles_IS_Paragraph1 = "The Interface Segregation Principle states that clients should not be forced to implement interfaces they don't use.";
        this.Principles_IS_Paragraph2 = "Rather than having large interfaces, it is more flexible to have smaller interfaces that can be used in combination with one-another.";
        this.Principles_IS_Paragraph3 = "For example, cars, cement mixers and motorbikes are all vehicles. If we had an IVehicle interface that each class inherited, this may work for methods such as Accelerate(), Brake(), etc. However the cement mixer would have a method Mix(), which the others would not. Also, the Motorbike class may have a method Wheelie() that the others would not. As such, IVehicle is a polluted interface and is not sufficiently flexible.";
        this.Principles_IS_Paragraph4 = "Rather than having the one IVehicle interface, we would be better off with several: IDriveable, IMixable and IWheelie (or IWheelieable if you prefer). Then the Car class could implement IDriveable, the CementMixer class could implement IDriveable and IMixable and the Motorbike class could implement IDriveable and IWheelie.";
        this.Principles_DI_Title = "Dependency inversion";
        this.Principles_DI_Paragraph1 = "The Dependency Inversion principle states that:";
        this.Principles_DI_Paragraph1_B1 = "High level modules should not depend upon low-level modules. Both should depend upon abstractions.";
        this.Principles_DI_Paragraph1_B2 = "Abstractions should never depend upon details. Details should depend upon abstractions.";
        this.Principles_DI_Paragraph2 = "This principle promotes loose coupling of software modules, which allows software to be more easily unit tested as well as allowing developers to program against interfaces rather than concrete classes which may not exist yet.";
        this.Principles_DI_Paragraph3 = "For example, we may have a method ProcessRegistration() on the RegistrationHandler class, which may ultimately send an email using the SendEmail() on the EmailService class. As such, the method ProcessRegistration() depends on the EmailService class. As such, we cannot unit test this method without calling the EmailService class and sending an email out.";
        this.Principles_DI_Paragraph4 = "In order to reverse this dependency, we can simply pass in the EmailService object when instantiating up the RegistrationHandler class. ";
        // Server Technologies
        this.Technologies_CSharp_Title = "C#";
        this.Technologies_CSharp_Paragraph1 = "C# is an object-oriented language that can be used to write .NET applications. It has a similar syntax to Java.";
        this.Technologies_CSharp_Paragraph2 = "It is my favourite language to code in due to the easy-to-use syntax, its rich features (such as LINQ) and that it can be written in Microsoft Visual Studio.";
        this.Technologies_MVC_Title = "ASP.NET MVC";
        this.Technologies_MVC_Paragraph1 = "This flavour of ASP.NET deals with server-side page rendering by combining 3 types of files - Model, View and Controller.";
        this.Technologies_MVC_Paragraph2 = "The 'Model' (or 'View-Model') is a class that defines what data the view will have access to.";
        this.Technologies_MVC_Paragraph3 = "The 'View' is a HTML template, which can be fed a data model in order to display its content, and enriched with logic using Razor for example.";
        this.Technologies_MVC_Paragraph4 = "The 'Controller' handles the requests from the clients, and responds. Usually this will involve getting data and returning a view. Controller logic should be kept to a minimum in order to keep the code base clean. Tasks should be offloaded to services and models.";
        this.Technologies_WebApi_Title = "Microsoft Web API";
        this.Technologies_WebApi_Paragraph1 = "Web API is Microsoft's tool for creating a JSON API for your web application.";
        this.Technologies_WebApi_Paragraph2 = "The emergence of Single Page Applications (SPA) has lead to many products abandoning server-side rendering and using a Javsscript framework on the front-end that interacts with the server's API layer.";
        this.Technologies_WebForms_Title = "ASP.NET Web Forms";
        this.Technologies_WebForms_Paragraph1 = "Web Forms are an old ASP.NET technology for developing web applications. You would not expect new products to use Web Forms, however there are many legacy systems out there that use it due to its popularity in the past.";
        this.Technologies_WebForms_Paragraph2 = "They make use of a Page file (.aspx) and a Code-Behind file (.aspx.cs). The Page contains the markup, including ASP tags, while the Code-Behind deals with the logic such as button clicks.";
        this.Technologies_NodeJS_Title = "Node JS";
        this.Technologies_NodeJS_Paragraph1 = "Node JS is an open-source technology that allows you to quickly and easily develop a web server in Javascript. This application is written in Node JS.";
        this.Technologies_NodeJS_Paragraph2 = "It is very light-weight, and so you need to import pretty much any tool you need. This contrasts to ASP.NET which comes with a lot of built-in goodies, but results in a larger code base.";
        this.Technologies_NodeJS_Paragraph3 = "Server-side rendering can be achieved using various template plug-ins. My preference is EJS. Single Page Applications can be easily developed using Node JS as the API server.";
        this.Technologies_NodeJS_Paragraph4 = "Node JS is well suited for a simple API server as it is quick to set up. Some people question whether it is an appropriate tool to use for building large enterprise applications.";
        this.Technologies_NodeJS_Paragraph5 = "If a large and complex system is developed in Node JS, it should be architected to use Microservices and possibly a message bus such as RabbitMQ.";
        this.Technologies_NUnit_Title = "NUnit";
        this.Technologies_NUnit_Paragraph1 = "This is the most popular unit testing framework for .NET. I have used this for as long as I have developed in C#. Other popular test frameworks are very similar - if you can use one, you can easily pick up another.";
        this.Technologies_iText_Title = "iText Sharp";
        this.Technologies_iText_Paragraph1 = "This is a PDF generation library for .NET development. It is a good tool and there is a lot of support for it online.";
        this.Technologies_iText_Paragraph2 = "When developing with iText, it is very important not to follow the same style as the documentation's examples. These examples do not have any refactoring applied and do not separate concerns in any way.";
        this.Technologies_iText_Paragraph3 = "From experience, I have found it is important split your code up so that you have:";
        this.Technologies_iText_Paragraph3_B1 = "Renderer class - responsible only for drawing elements";
        this.Technologies_iText_Paragraph3_B2 = "Renderable component classes (with a Renderer class injected)";
        this.Technologies_iText_Paragraph3_B3 = "Renderable sub-components within the components";
        this.Technologies_iText_Paragraph3_B4 = "Settings class - to define document's settings such as margins";
        this.Technologies_iText_Paragraph3_B5 = "Render Manager class - to simulate a component or sub-component render and go-ahead if successful.";
        this.Technologies_PowerShell_Title = "PowerShell";
        this.Technologies_PowerShell_Paragraph1 = "PowerShell is the Windows scripting language that is very powerful. It is great for automating tasks to speed up development.";
        this.Technologies_PowerShell_Paragraph2 = "With PowerShell you can interact with all sorts of applications such as IIS, Task Scheduler and Windows Processes. For this reason, PowerShell is a great tool for automated deployments.";
        // Database Technologies
        this.Technologies_SqlServer_Title = "Microsoft SQL Server";
        this.Technologies_SqlServer_Paragraph1 = "SQL Server is my preferred database as it is very feature-rich and comes with SQL Server Management Studio which makes certain tasks, such as creating backups and restoring very easy.";
        this.Technologies_MySql_Title = "MySql";
        this.Technologies_MySql_Paragraph1 = "I have some experience of using MySQL on Linux servers. When using it, I have missed the benefits that T-SQL brings. Also the GUIs for MySQL are not nearly as good as SQL Server Management Studio.";
        this.Technologies_MongoDB_Title = "MongoDB";
        this.Technologies_MongoDB_Paragraph1 = "MongoDB is a popular No-SQL database. It can be used with Mongoose, the official ORM for MongoDB. I plan on using it for database for this application in the near future.";
        // Javascript Technologies
        this.Technologies_Typescript_Title = "TypeScript";
        this.Technologies_Typescript_Paragraph1 = "I love TypeScript! Why? It solves so many of Javascript's weaknesses.";
        this.Technologies_Typescript_Paragraph2 = "The main problem with Javascript is that it is loosely typed. This often results in run-time errors that would have been caught if it were compiled. TypeScript compiles your .ts file into .js files, and performs type checking. If you have a type mismatch, the compiler will pick it up.";
        this.Technologies_Typescript_Paragraph3 = "TypeScript also allows us to write nice object-oriented code easily, using classes, interfaces, inheritance, etc.";
        this.Technologies_Knockout_Title = "Knockout";
        this.Technologies_Knockout_Paragraph1 = "Knockout is a two-way binding library that is great for quickly getting an interactive page knocked out.";
        this.Technologies_Knockout_Paragraph2 = "It allows you to bind your Javascript data structure to the DOM, in a similar way to Mustache and Handlebars, and has been around for quite a few years.";
        this.Technologies_Knockout_Paragraph3 = "This app has been written using Knockout.";
        this.Technologies_React_Title = "React";
        this.Technologies_React_Paragraph1 = "React is a new Javascript library developed by Facebook.";
        this.Technologies_React_Paragraph2 = "It allows for very fast rendering due to its use of a virtual DOM. It also provides very tight data control due to its uni-directional data flow.";
        this.Technologies_Angular1_Title = "Angular 1";
        this.Technologies_Angular1_Paragraph1 = "Angular is a very commonly used Javascript framework. It provides templating, data-binding, routing, HTTP requests and much more.";
        this.Technologies_Angular2_Title = "Angular 2";
        this.Technologies_Angular2_Paragraph1 = "Angular 2 is an update on Angular 1 and provides various improvements on the previous version.";
        this.Technologies_Jasmine_Title = "Jasmine";
        this.Technologies_Jasmine_Paragraph1 = "Jasmine is a Javascript testing framework. It runs in the browser.";
        this.Technologies_Mocha_Title = "Mocha";
        this.Technologies_Mocha_Paragraph1 = "Mocha is a Javascript test framework that has become very popular recently. I believe this is due to its flexibility - you can choose from a range of assertion libraries (including Jasmine's assertion library), it can run on the command line and in the browser.";
        // Menu Text
        this.Menu_Home = "Home";
        this.Menu_Experience = "Experience";
        this.Menu_About = "About me";
        this.Menu_Career = "My Career";
        this.Menu_OOPrinciples = "Object-Oriented Principles";
        this.Menu_SolidPrinciples = "SOLID Principles";
        this.Menu_Principles = "Other Principles";
        this.Menu_ServerTechnologies = "Server Technologies";
        this.Menu_JavascriptTechnologies = "Javascript Technologies";
        this.Menu_DatabaseTechnologies = "Database Technologies";
        this.Menu_DesignPatterns = "Design Patterns";
    }
    return en_gb;
}());

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
var TechnologyType;
(function (TechnologyType) {
    TechnologyType[TechnologyType["Server"] = 1] = "Server";
    TechnologyType[TechnologyType["Database"] = 2] = "Database";
    TechnologyType[TechnologyType["FrontEnd"] = 3] = "FrontEnd";
})(TechnologyType || (TechnologyType = {}));
