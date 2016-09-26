/// <reference path="UiText.ts" />

class en_gb implements IUiText {

	constructor() {
	}

	Banner_Logo: string = "Justin R";
	Banner_Slogan1: string = "Create";
	Banner_Slogan2: string = "Improve";
	Banner_Slogan3: string = "Inspire";

	Login_Title: string = "Login";
	Login_Username: string = "Username";
	Login_Password: string = "Password";
	Login_LoginButton: string = "Log me in!";
	Login_Register_Title: string = "Register";
	Login_Register_Button: string = "Sign me up!";
	Login_ForgottenPassword_Button: string = "Remind me!";
	Login_ForgottenPassword_Title: string = "Forgotten password?";

	Home_Title: string = "Welcome!";
	Home_P1: string = "In this online CV app, I mention:";
	Home_P1_B1: string = "How I like to work";
	Home_P1_B2: string = "My previous jobs";
	Home_P1_B3: string = "Principles of software development";
	Home_P1_B4: string = "Design patterns";
	Home_P1_B5: string = "Technologies I am familiar with";

	Home_P2: string = "Use the menu to navigate to each page.";

	About_Title: string = "About me";
	About_P1: string = "As a software developer, these are my top 5 philosophies:"
	About_P1_B1: string = "Automation";
	About_P1_B1_P1: string = "In order to maximise productivity, any repeatedly performed tasks should be automated so you can spend more time developing. This can often be done by writing scripts, such as PowerShell on Windows and Bash on Unix and Linux. For more complex tasks such as automated application deployment, external tools may need to be used such as TeamCity, Jenkins or Team Foundation Server (TFS).";
	About_P1_B2: string = "Refactoring";
	About_P1_B2_P1: string = "Code can very easily become messy due to many factors. It is important to refactor your newly written code as you go along, and before each commit to check whether anything can be refactored or made more generic. Repeated code is costly to maintain, so look out for it. And if you spot it, refactor it!";
	About_P1_B3: string = "Laying a solid foundation";
	About_P1_B3_P1: string = "It is very tempting to quickly knock together a working feature or application to either show that you are making good progress or to give an early demonstration to stakeholders. While this is sometimes necessary, it should be avoided when possible. From experience, it is always a lot quicker to lay a sturdy foundation first, then write the rest of your code on top of it. The problem with skipping the foundation laying is that once your code works, you then need to dig it up to ensure it is written properly, which often takes more effort than you had predicted. Another disadvantage is that some parts of the foundation never get done as the project deadline looms... and the final product is less robust than you had intended. The larger the project, the more important it is to lay good foundations right from the start."
	About_P1_B4: string = "Use up-to-date technology";
	About_P1_B4_P1: string = "It is very common for a technology to be used in a software project, and as the software ages the technology used becomes out of date. Often this is because it can be difficult to change, more so if your code is tightly coupled. The main problem with out-of-date technology is that there is little or no support for it, and often there will be bugs that are fixed in a later release. ";
	About_P1_B5: string = "Be organised";
	About_P1_B5_P1: string = "Working in an organised manner is necessary in order to for you and your team to work efficiently. For me, being organised includes doing the following:";
	About_P1_B5_P1_B1: string = "Regularly writing down updates on your tickets";
	About_P1_B5_P1_B2: string = "Keeping colleagues, stakeholders and line managers up-to-date";
	About_P1_B5_P1_B3: string = "Writing documentation for any new feature you develop";
	About_P1_B5_P1_B4: string = "Put your code files into separate folders where appropriate";
	About_P1_B5_P1_B5: string = "Regularly commit changes to source control";
	About_P1_B5_P1_B6: string = "Ensure any important files you have are backed up";
	About_P1_B5_P1_B7: string = "Keeping code files small and manageable";

	Experience_Title = "Experience";
	Experience_Year: string = "Year";
	Experience_Years: string = "Years";

	Career_Title: string = "My Career";
	Career_P1: string = "Take a look at my professional experience using the timeline below.";



	DesignPatterns_Observer_Title: string = "Observer";
	DesignPatterns_Observer_P1: string = "The observer pattern facilitates communication between different parts of a system in the following way:";
	DesignPatterns_Observer_P1_B1: string = "Objects that need to be informed of a change are called \"obsevers\"";
	DesignPatterns_Observer_P1_B2: string = "Observers register themselves with an object that performs a certain action (subject)";
	DesignPatterns_Observer_P1_B3: string = "When the subject completes an action, a notify() method is run";
	DesignPatterns_Observer_P1_B4: string = "The notify method informs each registered observer of the action";
	DesignPatterns_Observer_P1_B5: string = "Each observer processes this message in whatever way they need to";

	DesignPatterns_Mediator_Title: string = "Mediator";
	DesignPatterns_Mediator_P1: string = "The mediator pattern can be thought of as similar to the observer pattern but allows for more decoupled code:";
	DesignPatterns_Mediator_P1_B1: string = "Observers register with the mediator on a channel.";
	DesignPatterns_Mediator_P1_B2: string = "When subjects complete an action, they inform the mediator.";
	DesignPatterns_Mediator_P1_B3: string = "When the mediator receives an update from a subject, it passes it on to the observers of that channel.";
	DesignPatterns_Mediator_P2: string = "A major benefit of the mediator pattern is that it can vastly simplify the communication between different parts of your application.";

	DesignPatterns_ChainOfResponsibility_Title: string = "Chain of Responsibility";
	DesignPatterns_ChainOfResponsibility_P1: string = "The chain of responsibily pattern:";
	DesignPatterns_ChainOfResponsibility_P1_B1: string ="Provides decoupling of the sender of a request and receiver";
	DesignPatterns_ChainOfResponsibility_P1_B2: string ="Gives more than one object a chance to handle the request";
	DesignPatterns_ChainOfResponsibility_P1_B3: string ="The request is passed along the chain until it is handled";

	DesignPatterns_Factory_Title: string = "Factory";
	DesignPatterns_Factory_P1: string = "The factory pattern:";
	DesignPatterns_Factory_P1_B1: string = "Is a creational design pattern"
	DesignPatterns_Factory_P1_B2: string = "Hides the creation logic from the client"
	DesignPatterns_Factory_P1_B3: string = "Newly created objects implement a common interface"

	DesignPatterns_Facade_Title: string = "Facade";
	DesignPatterns_Facade_P1: string = "The facade pattern:";
	DesignPatterns_Facade_P1_B1: string = "Provides a simplified interface to a larger body of code.";
	DesignPatterns_Facade_P1_B2: string = "Defines a higher-level interface that  makes a subsystem easier to use";

	Principles_DRY_Title: string = "Don't repeat yourself";
	Principles_DRY_Paragraph1: string = "For me, DRY is the most important principle to follow when programming for the following reasons:";
	Principles_DRY_Paragraph1_B1: string = "Code will be more easily maintainable as logic is in one place only";
	Principles_DRY_Paragraph1_B2: string = "Code can very easily be split out to other files if necessary";
	Principles_DRY_Paragraph1_B3: string = "Code will be more legible and nice to work with";
	Principles_DRY_Paragraph1_B4: string = "Files and projects will not grow unnecessarily large";
	Principles_DRY_Paragraph1_B5: string = "Bugs will appear less frequently if changes need to be made in one place only";

	Principles_Automation_Title: string = "Automation";
	Principles_Automation_Paragraph1: string = "It is important for a software team's productivity for all repeated tasks to be automated. While an initial effort is required to script up, test and maintain these tasks, much time will be saved in the long-term.";
	Principles_Automation_Paragraph2: string = "The following are common tasks for a software development team that should normally be automated";
	Principles_Automation_Paragraph2_B1: string = "Building an application";
	Principles_Automation_Paragraph2_B2: string = "Deploying an application";
	Principles_Automation_Paragraph2_B3: string = "Compiling CSS and Javascript when source files are changed in a development environment";
	Principles_Automation_Paragraph2_B4: string = "Regular data retrieval";

	Principles_CD_Title: string = "Continuous delivery";
	Principles_CD_Paragraph1: string = "The terms \"Continuous Delivery\" and \"Continuous Integration\" have become very fashionable terms recently, with many people having their own opinions on their meanings. For me, Continous Delivery means that our software project is always in a position where it could be deployed (or delivered) if needed. This can be achieved by";
	Principles_CD_Paragraph1_B1: string = "Using a build server such as TeamCity, Jenkins or Team Foundation Server (TFS)";
	Principles_CD_Paragraph1_B2: string = "Build server alerts the team when a commit breaks the build or causes any automated tests to fail";
	Principles_CD_Paragraph1_B3: string = "Ensuring the team has a culture of fixing the build as a first priority, and not to make commits on top of a broken build";
	Principles_CD_Paragraph1_B4: string = "Preventing a commit to the mainline trunk if it breaks the build or causes an automated test to fail (although some teams find this overly restrictive)";

	Principles_Encapsulation_Title: string = "Encapsulation";
	Principles_Encapsulation_Paragraph1: string = "Encapsulation is a principle of object-oriented programming that is about hiding the inner workings of a class, while providing a simple interface to interact with it.";
	Principles_Encapsulation_Paragraph2: string = "For example we may have a Person class with a method EatBiscuit(biscuit). Within the EatBiscuit method, there may be several inner methods being called in succession, such as OpenBiscuitTin(), GetBiscuit(biscuit), ShoveInMouth(biscuit). By wrapping up these 3 consecutive methods into one method, we make the interaction with the Person object simpler.";

	Principles_Inheritance_Title: string = "Inheritance";
	Principles_Inheritance_Paragraph1: string = "Inheritance is an object-oriented principle that allows re-use of functionality by providing a hierarchical class structure.";
	Principles_Inheritance_Paragraph2: string = "For example: cars, vans, lorries, buses, bikes and motorbikes are all forms of vehicles. Therefore it may make sense to have a base class called Vehicle that all of these could inherit. The vehicle class could have common methods such as Accelerate, Brake, Reverse, Turn as well as common properties such as NumerOfSeats, NumberOfWheels, etc.";
	Principles_Inheritance_Paragraph3: string = " The use of class inheritance is actually becoming less popular as the use of Interface Composition is becoming more popular.";

	Principles_Composition_Title: string = "Interface composition";
	Principles_Composition_Paragraph1: string = "Interface composition allows classes to have multiple behaviours by implementing multiple interfaces. This has become more popular in recent years and by many preferred over inheritance in order to achieve polymorphism.";
	Principles_Composition_Paragraph2: string = "For example: cars, vans, lorries, buses, bikes and motorbikes are all vehicles. Instead of having them inherit a base class called Vehicle, each class could inherit behaviours via an interface. For example they may all implement the Accelerate, Brake and Turn behaviours. However it could be that only bikes and motorbikes implement the Wheelie behaviour, and that all except these 2 implement the Load/Unload behaviour.";

	Principles_Abstraction_Title: string = "Abstraction";
	Principles_Abstraction_Paragraph1: string = "Abstraction can be defined as the concept of describing something in simpler terms, focusing only on what is important or relevant."
	Principles_Abstraction_Paragraph2: string = "For example, we may have a process that deals with Vehicles objects, without being concerned exactly what type of vehicle it is, since all vehicles have certain properties in common. The Vehicle class may be an abstract class. We could use the technique of Encapsulation to abstract away the complexities of the inner workings of the different classes we interact with.";

	Principles_Polymorphism_Title: string =  "Polymorphism";
	Principles_Polymorphism_Paragraph1: string = "Polymorphism is the ability to present the same interface for different types.";
	Principles_Polymorphism_Paragraph2: string = "For example, a car class and a bus class would both have a method \"Accelerate()\". However the implementation for each may be different. Each of these classes may implement the IVehicle interface which ensures the Accelerate method exists. The client code would therefore be able to run vehicle.Accelerate() on each item, which would in fact call two different methods, one on the car class and one on the bus class.";

	Principles_SR_Title: string = "Single responsibility principle";
	Principles_SR_Paragraph1: string = "The Single Responsibility Principle states that every module or class should have one job to do, and one only. As soon as a class is doing more than one job, it is violating this principle.";
	Principles_SR_Paragraph2: string = "Adhering to this principle makes your software much easier to maintain and change, as any change will only need to be made in one place.";
	Principles_SR_Paragraph3: string = "For example, your program logs errors to the server when they occur using NLog. Within each class, we could have code along the lines of \"_logger = new NLog.Logger()\" for instantiating the logger, as well as \"_logger.Error(errorMessage)\". Now imagine that you need to change the logging library to another. You would need to change each and every class where logging code exists, to use the new library and its different methods.";
	Principles_SR_Paragraph4: string = "If we had created a Logger class which handles all the logging, then when it comes to changing the logging library, we would simply need to change the Logger class, and nothing else. This is how adhering to this principle can vastly simplify the maintenance of software.";

	Principles_OC_Title: string = "Open closed principle";
	Principles_OC_Paragraph1: string = "The Open Closed principle states that modules and classes should be open for extension, but closed for modification.";
	Principles_OC_Paragraph2: string = "The benefit for this is that your classes and modules may already be in use and depended on by client applications, so avoiding changes avoids creating new bugs. Changing the name of a function for example, could result in a client application breaking. So if we require a change to an existing function, we could create a new function and extend the existing one.";

	Principles_Liskov_Title: string = "Liskov's substitution principle";
	Principles_Liskov_Paragraph1: string = "Liskov's Substitution Principle (LSP) states that \"Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.\"";
	Principles_Liskov_Paragraph2: string = "It provides a guideline on when it is appropriate to extend classes, and when an alternative such as composition is best.";
	Principles_Liskov_Paragraph3: string = "A common example of this is with the shapes Rectangle and Square. It could be said that a Square class should inherit from the Rectangle class because a square is a rectangle, albeit with an equal height and width. However complications can arise with regards to behaviour, since a method \"SetWidth() on a rectangle would affect the width only, however on a square it should also affect the height. As such, the SetWidth() method becomes inappropriate for a square.\" As such, Square should probably not inherit from Rectangle.";

	Principles_IS_Title: string = "Interface segregation principle";
	Principles_IS_Paragraph1: string = "The Interface Segregation Principle states that clients should not be forced to implement interfaces they don't use.";
	Principles_IS_Paragraph2: string = "Rather than having large interfaces, it is more flexible to have smaller interfaces that can be used in combination with one-another.";
	Principles_IS_Paragraph3: string = "For example, cars, cement mixers and motorbikes are all vehicles. If we had an IVehicle interface that each class inherited, this may work for methods such as Accelerate(), Brake(), etc. However the cement mixer would have a method Mix(), which the others would not. Also, the Motorbike class may have a method Wheelie() that the others would not. As such, IVehicle is a polluted interface and is not sufficiently flexible.";
	Principles_IS_Paragraph4: string = "Rather than having the one IVehicle interface, we would be better off with several: IDriveable, IMixable and IWheelie (or IWheelieable if you prefer). Then the Car class could implement IDriveable, the CementMixer class could implement IDriveable and IMixable and the Motorbike class could implement IDriveable and IWheelie.";

	Principles_DI_Title: string = "Dependency inversion";
	Principles_DI_Paragraph1: string = "The Dependency Inversion principle states that:";
	Principles_DI_Paragraph1_B1: string = "High level modules should not depend upon low-level modules. Both should depend upon abstractions.";
	Principles_DI_Paragraph1_B2: string = "Abstractions should never depend upon details. Details should depend upon abstractions.";
	Principles_DI_Paragraph2: string = "This principle promotes loose coupling of software modules, which allows software to be more easily unit tested as well as allowing developers to program against interfaces rather than concrete classes which may not exist yet.";
	Principles_DI_Paragraph3: string = "For example, we may have a method ProcessRegistration() on the RegistrationHandler class, which may ultimately send an email using the SendEmail() on the EmailService class. As such, the method ProcessRegistration() depends on the EmailService class. As such, we cannot unit test this method without calling the EmailService class and sending an email out.";
	Principles_DI_Paragraph4: string = "In order to reverse this dependency, we can simply pass in the EmailService object when instantiating up the RegistrationHandler class. ";

	// Server Technologies
	Technologies_CSharp_Title: string = "C#";
	Technologies_CSharp_Paragraph1: string = "TODO: C# intro";

	Technologies_MVC_Title: string = "ASP.NET MVC";
	Technologies_MVC_Paragraph1: string = "TODO: MVC intro";

	Technologies_WebForms_Title: string = "ASP.NET Web Forms";
	Technologies_WebForms_Paragraph1: string = "TODO: Web Forms intro";

	Technologies_NodeJS_Title: string = "NodeJS";
	Technologies_NodeJS_Paragraph1: string = "TODO: NodeJS intro";

	Technologies_NUnit_Title: string = "NUnit";
	Technologies_NUnit_Paragraph1: string = "TODO: NUnit intro";

	Technologies_iText_Title: string = "iText Sharp";
	Technologies_iText_Paragraph1: string = "TODO: iText Sharp intro";

	Technologies_PowerShell_Title: string = "PowerShell";
	Technologies_PowerShell_Paragraph1: string = "TODO: PowerShell intro";

	// Database Technologies
	Technologies_SqlServer_Title: string = "Microsoft SQL Server";
	Technologies_SqlServer_Paragraph1: string = "TODO: SqlServer";

	Technologies_MySql_Title: string = "MySql";
	Technologies_MySql_Paragraph1: string = "TODO: MySql";

	Technologies_MongoDB_Title: string = "MongoDB";
	Technologies_MongoDB_Paragraph1: string = "TODO: MongoDB";

	// Javascript Technologies
	Technologies_Typescript_Title: string = "Typescript";
	Technologies_Typescript_Paragraph1: string = "TODO: TypeScript intro";

	Technologies_Knockout_Title: string = "Knockout";
	Technologies_Knockout_Paragraph1: string = "TODO: Knockout";

	Technologies_React_Title: string = "React";
	Technologies_React_Paragraph1: string = "TODO: React";

	Technologies_Angular1_Title: string = "Angular 1";
	Technologies_Angular1_Paragraph1: string = "TODO: Angular 1";

	Technologies_Angular2_Title: string = "Angular 2";
	Technologies_Angular2_Paragraph1: string = "TODO: Angular 2";

	Technologies_Jasmine_Title: string = "Jasmine";
	Technologies_Jasmine_Paragraph1: string = "TODO: Jasmine";

	Technologies_Mocha_Title: string = "Mocha";
	Technologies_Mocha_Paragraph1: string = "TODO: Mocha";

	// Menu Text
	Menu_Home: string = "Home";
	Menu_Experience: string = "Experience";
	Menu_About: string = "About me";
	Menu_Career: string = "My Career";
	Menu_OOPrinciples: string = "Object-Oriented Principles";
	Menu_SolidPrinciples: string = "SOLID Principles";
	Menu_Principles: string = "Other Principles";
	Menu_ServerTechnologies: string = "Server Technologies";
	Menu_JavascriptTechnologies: string = "Javascript Technologies";
	Menu_DatabaseTechnologies: string = "Database Technologies";
	Menu_DesignPatterns: string = "Design Patterns";
}