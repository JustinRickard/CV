/// <reference path="../models/User.ts" />

interface IUserHelper {
	CreateUser(u: IUser): User;
}

class UserHelper implements IUserHelper {

	constructor(){};

	public CreateUser(u: IUser): User {
		return new User(u.ID, u.Username, u.FirstName, u.LastName, u.Email, u.Telephone);
	}
}