/// <reference path="Logger.ts" />
/// <reference path="AppModel.ts" />

import { MessageDisplayStatus } from '../../shared/models/Enums';
import { IAppModel, AppModel } from './AppModel';
import { ICvLogger, CvLogger } from './Logger';

export interface ICvErrorHandler {
	AppModel: IAppModel;
	CvLogger: ICvLogger;
	Handle(messageStatus: MessageDisplayStatus, message: string): void;
}



export class CvErrorHandler implements ICvErrorHandler {
	AppModel: IAppModel;
	CvLogger: ICvLogger;

	constructor(appModel: IAppModel, logger: ICvLogger) {
		this.AppModel = appModel;
		this.CvLogger = logger;
	}

	public Handle(messageStatus: MessageDisplayStatus, message: string): void {
		// Display error message
		this.AppModel.SetMessage(messageStatus, message);

		// Log message
		switch (messageStatus) {
			case MessageDisplayStatus.Error:
				this.CvLogger.Error(message)
				break;
			case MessageDisplayStatus.Warning:
				this.CvLogger.Warning(message);
				break;
		}
	}

	public Clear() {
		this.AppModel.ClearMessage();
	}
}