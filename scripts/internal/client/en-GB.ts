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