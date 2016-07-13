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
	About_P1_B3_P1: string = "It is very tempting to quickly knock together a working feature or application to either show that you are making good progress or to give an early demonstration to steakholders. While this is sometimes necessary, it should be avoided when possible. From experience, it is always a lot quicker to lay a sturdy foundation first, then write the rest of your code on top of it. The problem with skipping the foundation laying is that once your code works, you then need to dig it up to ensure it is written properly, which often takes more effort than you had predicted. Another disadvantage is that some parts of the foundation never get done as the project deadline looms... and the final product is less robust than you had intended. The larger the project, the more important it is to lay good foundations right from the start."
	About_P1_B4: string = "Use up-to-date technology";
	About_P1_B4_P1: string = "It is very common for a technology to be used in a software project, and as the software ages the technology used becomes out of date. Often this is because it can be difficult to change, more so if your code is tightly coupled. The main problem with out-of-date technology is that there is little or no support for it, and often there will be bugs that are fixed in a later release. ";
	About_P1_B5: string = "Be organised";
	About_P1_B5_P1: string = "";

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
	Principles_DRY_Paragraph1: string = "TODO: Don't repeat yourself";

	Principles_Automation_Title: string = "Automation";
	Principles_Automation_Paragraph1: string = "TODO: Automation";

	Principles_CD_Title: string = "Continuous delivery";
	Principles_CD_Paragraph1: string = "TODO: Continuous delivery";

	Principles_Encapsulation_Title: string = "Encapsulation";
	Principles_Encapsulation_Paragraph1: string = "TODO: Encapsulation";

	Principles_Inheritance_Title: string = "Inheritance";
	Principles_Inheritance_Paragraph1: string = "TODO: Inheritance";

	Principles_Composition_Title: string = "Interface composition";
	Principles_Composition_Paragraph1: string = "TODO: Interface composition";

	Principles_Abstraction_Title: string = "Abstraction";
	Principles_Abstraction_Paragraph1: string = "TODO: Abstraction";

	Principles_Polymorphism_Title: string =  "Polymorphism";
	Principles_Polymorphism_Paragraph1: string = "TODO: Polymorphism";

	Principles_SR_Title: string = "Single responsibility principle";
	Principles_SR_Paragraph1: string = "TODO: Single responsibility principle";

	Principles_OC_Title: string = "Open closed principle";
	Principles_OC_Paragraph1: string = "TODO: Open closed principle";

	Principles_Liskov_Title: string = "Liskov's law";
	Principles_Liskov_Paragraph1: string = "TODO: Liskov";

	Principles_IS_Title: string = "Interface segregation principle";
	Principles_IS_Paragraph1: string = "TODO: Interface segregation";

	Principles_DI_Title: string = "Dependency inversion";
	Principles_DI_Paragraph1: string = "TODO: Dependency inversion";

	Technologies_CSharp_Title: string = "C#";
	Technologies_CSharp_Paragraph1: string = "TODO: C# intro"

	Technologies_Typescript_Title: string = "Typescript";
	Technologies_Typescript_Paragraph1: string = "TODO: TypeScript intro"

	Assessments_Title: string = "Assessments";
	Assessments_Paragraph1: string = "TODO: Assessment intro";

	Chat_Title: string = "Chat live with other members who are logged on!";
	Chat_Post: string = "Post";
	Chat_PostHelp: string = "Type your post here";

	Menu_Home: string = "Home";
	Menu_About: string = "About me";
	Menu_Career: string = "My Career";
	Menu_Principles: string = "Principles";
	Menu_Technologies: string = "Technologies";
	Menu_DesignPatterns: string = "Design Patterns";
	Menu_Logout: string = "Log out"
}