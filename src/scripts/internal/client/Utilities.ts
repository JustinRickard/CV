/// <reference path="Job.ts" />
/// <reference path="ErrorHandler.ts" />
/// <reference path="../shared/models/Enums.ts" />
/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/lodash/lodash.d.ts" />

class Utilities {

	ErrorHandler: IErrorHandler;

	constructor(errorHandler: IErrorHandler)
	{
		this.ErrorHandler = errorHandler;
	}

	// DATA ACCESS METHODS
	public Get(url: string): any {
		return this.CallServer(HttpVerb.GET, url, null);
	}

	public Post(url: string, postData: any): void {
		return this.CallServer(HttpVerb.POST, url, postData);
	}

	public CallServer(httpVerb: HttpVerb, url: string, postData: any) {
		var verb: string;
		switch (httpVerb) {
			case HttpVerb.GET:
				$.ajax({
					url: url,
					type: 'GET',
					success: ((data) => {
						return data;
					}),
					error: ((jq, status, message)  => {
						this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while getting data from the server. Status: " + status + ' - Message: ' + message);
						return null
					}),
					dataType: 'json'
				});
				break;

			default:
				$.ajax({
					url: url,
					type: 'POST',
					success: ((data) => {
						return data;
					}),
					error: ((jq, status, message) => {
						this.ErrorHandler.Handle(MessageDisplayStatus.Error, "An error has occurred while posting data to the server. Status: " + status + ' - Message: ' + message);
						return null;
					}),
					dataType: 'json'
				});
				break;
		}
	}

	// VALIDATION METHODS
	public EmailIsValid(email: string): boolean {
		var pattern = /.*@.*[.].*/g;
		var found = email.match(pattern);
		if (!found) {
			return false
		}
		return true;
	}

	// CREATE METHODS (FROM INTERFACE)
	public CreateJob(j: IJobServerDto): Job {
		return new Job(j.Company, j.Description, new Date(j.Start), new Date(j.End), j.IsCurrent, j.ImageUrl);
	}

	// Data manipulation
	public DateToString(date: Date): string {
		var day = this.To2Figures(date.getDate().toString());
		var month = this.To2Figures(date.getMonth().toString());

		return date.getFullYear() + "," + month + "," + day;
	}

	public To2Figures (numberAsString: string): string {
		if (numberAsString.length === 1)
		{
			numberAsString = "0" + numberAsString;
		}
		return numberAsString;
	}
}