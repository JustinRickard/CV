/// <reference path="User.ts" />
/// <reference path="../helpers/UserHelper.ts" />
/// <reference path="../factories/UserFactory.ts" />

interface IChatPost {
	Time: Date;
	UserID: number;
	Text: string;
}

class ChatPost {
	Time: Date;
	User: IUser;
	Text: string;

	constructor(user: IUser, text: string, time: Date) {
		this.User = user;
		this.Text = text;
		this.Time = time;
	}
}