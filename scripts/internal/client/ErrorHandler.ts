/// <reference path="Logger.ts" />
/// <reference path="AppModel.ts" />

interface IErrorHandler {
	AppModel: IAppModel;
	Logger: ILogger;
	Handle(messageStatus: MessageDisplayStatus, message: string): void;
}

class ErrorHandler implements IErrorHandler {
	AppModel: IAppModel;
	Logger: ILogger;

	constructor(appModel: IAppModel, logger: ILogger) {
		this.AppModel = appModel;
		this.Logger = logger;
	}

	public Handle(messageStatus: MessageDisplayStatus, message: string): void {
		// Display error message
		this.AppModel.SetMessage(messageStatus, message);

		// Log message
		switch (messageStatus) {
			case MessageDisplayStatus.Error:
				this.Logger.Error(message)
				break;
			case MessageDisplayStatus.Warning:
				this.Logger.Warning(message);
				break;
		}
	}

	public Clear() {
		this.AppModel.ClearMessage();
	}
}