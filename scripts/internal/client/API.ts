/// <reference path="AppModel.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />

interface IApi {
	ErrorHandler: IErrorHandler;
	GetAllData(): AppModel;
	Login(username: string, password: string): void;
	Logout(): void;
}

class LiveApi implements IApi {

	Utils: Utilities;
	Logger: ILogger;
	ErrorHandler: IErrorHandler;

	constructor(errorHandler: IErrorHandler, logger: ILogger) {
		this.Utils = new Utilities(errorHandler);
		this.Logger = logger;
		this.ErrorHandler = errorHandler;

	}
	
	public GetAllData(): AppModel {
		var data: IAppModel = this.Utils.Get("GetAll");
		if (data)
		{
			var appModel = new AppModel(
				this, data.User, data.Users, data.Jobs, data.Assessments, 
				data.ChatPosts, data.MessageStatus, data.CurrentMessage, 
				this.Logger, this.ErrorHandler);


			return appModel;
		}
		return null;
	}

	public Login(username: string, password: string): void {

	}

	public Logout(): void {

	}
	
}