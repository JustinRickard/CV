/// <reference path="Logger.ts" />

interface IErrorHandler {
	Logger: ILogger;
	Handle(messageStatus: MessageDisplayStatus, message: string): void;
}

class ErrorHandler implements IErrorHandler {
	Logger: ILogger;

	constructor(logger: ILogger) {
		this.Logger = logger;
	}

	public Handle(messageStatus: MessageDisplayStatus, message: string): void {
		switch (messageStatus) {
			case MessageDisplayStatus.Error:
				this.Logger.Error(message)
				break;
			case MessageDisplayStatus.Warning:
				this.Logger.Warning(message);
				break;
		}
	}
}