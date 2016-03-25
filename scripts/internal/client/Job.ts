
interface IJob {
	Company: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;
}

class Job implements IJob {
	Company: string;
	Start: Date;
	End: Date;
	IsCurrent: boolean;

	constructor (company: string, start: Date, end: Date, isCurrent: boolean) {
		this.Company = company;
		this.Start = start;
		this.End = end;
		this.IsCurrent = isCurrent;
	}
}