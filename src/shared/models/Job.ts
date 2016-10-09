
export interface IJob {
	Company: string;
	Description: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;
	ImageUrl: string;
}

export class Job implements IJob {
	Company: string;
	Description: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;
	ImageUrl: string;
	DatesString: string;

	constructor (company: string, description: string, start: Date, 
		end: Date, isCurrent: boolean, imageUrl: string) {
		this.Company = company;
		this.Description = description;
		this.Start = start;
		this.End = end;
		this.IsCurrent = isCurrent;
		this.ImageUrl = imageUrl;
		this.DatesString = this.DateString(start) + " - " + this.DateString(end);
	}

	private DateString (date: Date): string {
		return this.GetMonth(date) + " " + this.GetYear(date);
	}

	private GetMonth(date: Date): string {
		return date.toLocaleDateString("en-gb", { month: "long" })
	}

	private GetYear(date: Date): string {
		return date.getFullYear().toString();
	}
}