/// <reference path="User.ts" />
/// <reference path="Utilities.ts" />

interface IChatPost {
	Time: Date;
	UserID: number;
	Text: string;
}

class ChatPost {
	Time: Date;
	User: User;
	Text: string;

	constructor(user: IUser, text: string, time: Date, errorHandler: IErrorHandler) {
		var utils = new Utilities(errorHandler);
		this.User = utils.CreateUser(user);
		this.Text = text;
		this.Time = time;
	}
}