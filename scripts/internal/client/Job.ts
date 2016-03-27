
interface IJob {
	Company: string;
	Description: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;
	ImageUrl: string;
}

class Job implements IJob {
	Company: string;
	Description: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;
	ImageUrl: string;

	constructor (company: string, description: string, start: Date, 
		end: Date, isCurrent: boolean, imageUrl: string) {
		this.Company = company;
		this.Description = description;
		this.Start = start;
		this.End = end;
		this.IsCurrent = isCurrent;
		this.ImageUrl = imageUrl;
	}
}