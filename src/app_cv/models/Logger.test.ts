/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="Logger.ts" />

import { ICvLogger, CvLogger } from './Logger';

describe("Logger", () => {
	var logger: ICvLogger;

	beforeEach(() => {
		logger = new CvLogger();
	});

	it("should log errors", () => {
		spyOn(logger, "Error");
		logger.Error("Error text");
		expect(logger.Error).toHaveBeenCalled();
	});

	it("should log warnings", () => {
		spyOn(logger, "Warning");
		logger.Warning("Warning text");
		expect(logger.Warning).toHaveBeenCalled();
	});
});