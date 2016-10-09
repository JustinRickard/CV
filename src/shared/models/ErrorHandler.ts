/// <reference path="Logger.ts" />
/// <reference path="../../shared/models/Enums.ts" />

interface IErrorHandler {
	Logger: ILogger;
	Handle(message: string): void;
}

class ErrorHandler implements IErrorHandler {
	Logger: ILogger;

	constructor(logger: ILogger) {
		this.Logger = logger;
	}

	public Handle(message: string): void {
		this.Logger.Error(message)
	}
}