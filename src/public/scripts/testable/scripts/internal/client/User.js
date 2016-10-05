/// <reference path="Enums.ts" />
/// <reference path="API.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />
var User = (function () {
    function User(id, username, firstName, lastName, email, telephone) {
        this.ID = id;
        this.Username = username;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
        this.Telephone = telephone;
    }
    User.prototype.FullName = function () {
        // TODO: Localise this
        return this.FirstName + " " + this.LastName;
    };
    User.prototype.Logout = function () {
        // Should this just be on the API, not the user?
        localStorage.clear();
    };
    User.prototype.ResetPassword = function (newPassword, confirmNewPassword) {
        // TODO: Reset password
    };
    User.prototype.RequestPasswordReset = function () {
    };
    return User;
}());
