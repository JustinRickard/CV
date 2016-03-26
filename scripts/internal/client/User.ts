/// <reference path="Enums.ts" />
/// <reference path="API.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />

interface IUser {
	ID: number;
	Username: string;
	FirstName: string;
	LastName: string;
	Email: string;
	Telephone: string;
	FullName(): string;
}

class User implements IUser {

	ID: number;
	Username: string;
	FirstName: string;
	LastName: string;
	Email: string;
	Telephone: string;

	constructor(id: number, username: string, firstName: string, 
		lastName: string, email: string, telephone: string) {
		this.ID = id;
		this.Username = username;
		this.FirstName = firstName;
		this.LastName = lastName;
		this.Email = email;
		this.Telephone = telephone;
	}

	public FullName (): string {
		// TODO: Localise this
		return this.FirstName + " " + this.LastName;
	} 

	public Logout () {
		// Should this just be on the API, not the user?
		localStorage.clear();
	}

	public ResetPassword (newPassword: string, confirmNewPassword: string) {
		// TODO: Reset password
	}

	public RequestPasswordReset () {

	}
}