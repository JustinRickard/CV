/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="Job.ts" />

describe("Job", () => {

	var job: IJob;

	var company: string;
	var description: string;
	var start: Date;
	var end: Date;
	var isCurrent: boolean;
	var imageUrl: string;

	beforeEach(() => {
		company = "Test company";
		description;
		start = new Date(2012,12,1);
		end = null;
		isCurrent = true;
		imageUrl = "images/adc.jpg";

		job = new Job(company, description, start, end, isCurrent, imageUrl);

	});

	it("should contain company", () => {
		expect(job.Company).toEqual(company);
	})

	it("should contain description", () => {
		expect(job.Description).toEqual(description);
	})

	it("should contain start date", () => {
		expect(job.Start).toBeTruthy();
		expect(job.Start).toEqual(start);
	});

	it("should contain end date equal to set", () => {
		expect(job.End).toEqual(end);
	})

	it("should contain company", () => {
		expect(job.Company).toEqual(company);
	})

	it("should contain is current flag", () => {
		expect(job.IsCurrent).toEqual(isCurrent);
	})

	it("should contain image URL", () => {
		expect(job.ImageUrl).toEqual(imageUrl);
	})
});