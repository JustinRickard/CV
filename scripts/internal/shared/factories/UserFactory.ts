/// <reference path="../models/User.ts" />
/// <reference path="../helpers/UserHelper.ts" />

interface IUserFactory {
	GetUserHelper(): IUserHelper;

}

class UserFactory implements IUserFactory {
	UserHelper: IUserHelper;

	constructor() {
	};

	public GetUserHelper(): IUserHelper {
		if (!this.UserHelper) {
			this.UserHelper = new UserHelper();
		}

		return this.UserHelper;
	}
}