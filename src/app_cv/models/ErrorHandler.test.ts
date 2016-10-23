/// <reference path="../../../typings/index.d.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="Logger.ts" />

import { MessageDisplayStatus } from '../../shared/models/Enums'
import { ICvErrorHandler, CvErrorHandler } from './ErrorHandler';
import { ICvLogger, CvLogger } from './Logger';

describe("Error Handler", () => {

	var errorHandler: ICvErrorHandler;
	var logger: ICvLogger;
	var appModel: any; // To avoid dependencies

	var errorMsg: string;
	var warnMsg: string;

	beforeEach(() => {
		logger = new CvLogger();
		appModel = {
			SetMessage(messageStatus: MessageDisplayStatus, message: string): void {
			}
		};

		errorHandler = new CvErrorHandler(appModel, logger);

		errorMsg = "Test error message";
		warnMsg = "Test warning message";
	});

	it("should contain a logger", () => {
		expect(errorHandler.CvLogger).toBeTruthy();
	});

	it("should contain an AppModel", () => {
		expect(errorHandler.AppModel).toBeTruthy();
	});

	describe("Handle method", () => {

		it("should call AppModel.SetMessage on error", () => {
			spyOn(appModel, "SetMessage");
			errorHandler.Handle(MessageDisplayStatus.Error, errorMsg);
			expect(appModel.SetMessage).toHaveBeenCalled();
		});

		it("should call AppModel.SetMessage on warning", () => {
			spyOn(appModel, "SetMessage");
			errorHandler.Handle(MessageDisplayStatus.Warning, warnMsg);
			expect(appModel.SetMessage).toHaveBeenCalled();
		});

		it("should log error", () => {
			spyOn(logger, "Error");
			errorHandler.Handle(MessageDisplayStatus.Error, errorMsg);
			expect(logger.Error).toHaveBeenCalled();
		});

		it("should log warning", () => {
			spyOn(logger, "Warning");
			errorHandler.Handle(MessageDisplayStatus.Warning, warnMsg)
			expect(logger.Warning).toHaveBeenCalled();
		});
	});

});