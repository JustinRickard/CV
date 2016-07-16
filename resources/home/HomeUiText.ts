interface IHomeUiText {
	Home_Title: string;
	Home_Subtitle: string;
	Link_CV_Title: string;
	Link_CV_Description: string;
	Link_LiveChat_Title: string;
	Link_LiveChat_Description: string;
	Link_Assessment_Title: string;
	Link_Assessment_Description: string;
}

class HomeUiText2 implements IHomeUiText {

	constructor() {
	}

	Home_Title: string = "Justin Rickard";
	Home_Subtitle: string = "Software Developer";
	Link_CV_Title: string = "My CV";
	Link_CV_Description: string = "Learn about me, my knowledge and experience";
	Link_LiveChat_Title: string = "Live Chat";
	Link_LiveChat_Description: string = "Demo 1: live chat using web sockets";
	Link_Assessment_Title: string = "Assessment";
	Link_Assessment_Description: string = "Demo 2: online assessment for software developers";
}

