/// <reference path="../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../scripts/internal/client/Logger.ts" />

describe("Logger", () => {
	var logger: ILogger;

	beforeEach(() => {
		logger = new Logger();
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