/// <reference path="../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../scripts/internal/client/UiText.ts" />
/// <reference path="../../scripts/internal/shared/models/ChatPost.ts" />
/// <reference path="../../scripts/internal/shared/models/User.ts" />
/// <reference path="../../scripts/internal/client/Logger.ts" />
/// <reference path="../../scripts/internal/client/ErrorHandler.ts" />
/// <reference path="../../scripts/internal/client/Utilities.ts" />

describe("Chat Posts", () => {
	var user: IUser;
	var userID: number;
	var username: string;
	var firstName: string;
	var lastName: string;
	var email: string;
	var telephone: string;

	var errorHandler: any;  // Avoid dependencies
	var text: string;
	var time: Date;

	var chatPost;

	beforeEach(() => { 
		errorHandler = { 
			AppModel: "test",
			Logger: new Logger(),
			Handle: ((messageStatus: MessageDisplayStatus, message: string): void => {})
		};

		userID = 1;
		username = "TestUserName";
		firstName = "Test";
		lastName = "User";
		email = "TestUser@example.org";
		telephone = "07812345671"

		user = new User(userID, username, firstName, lastName, email, telephone);
		text = "Test chat message";
		time = new Date();

		chatPost = new ChatPost(user, text, time, errorHandler)
	});

	it("should contain text", () => {
		expect(chatPost.Text).toEqual(text);
	});

	it("should contain a date and time", () => {
		expect(chatPost.Time).toEqual(time);
	});

	it("should contain a user", () => {
		expect(chatPost.User).toBeTruthy();
	});

	describe("User", () => {
		it("should contain an ID", () => {
			expect(chatPost.User.ID).toEqual(userID);
		});

		it("should contain a Username", () => {
			expect(chatPost.User.Username).toEqual(username);
		});

		it("should contain a first name", () => {
			expect(chatPost.User.FirstName).toEqual(firstName);
		});

		it("should contain a last name", () => {
			expect(chatPost.User.LastName).toEqual(lastName);
		});

		it("should contain an email", () => {
			expect(chatPost.User.Email).toEqual(email);
		});

		it("should contain a Username", () => {
			expect(chatPost.User.Telephone).toEqual(telephone);
		});

	});
});