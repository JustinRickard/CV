// <reference path="../Utilities.ts" />

class Era {

	startDate: string;
	endDate: string;
	headline: string;
	text: string;
	tag: string;

	constructor (
		startDate: Date,
		endDate: Date,
		headline: string,
		text: string,
		tag: string
	) {
		this.startDate = this.DateToString(startDate);
		this.endDate =  this.DateToString(endDate);
		this.headline = headline;
		this.text = text;
		this.tag = tag;		     
	}

	private DateToString(date: Date): string {
		var day = this.To2Figures(date.getDate().toString());
		var month = this.To2Figures(date.getMonth().toString());

		return date.getFullYear() + "," + month + "," + day;
	}

	private To2Figures (numberAsString: string): string {
		if (numberAsString.length === 2)
		{
			numberAsString = "0" + day;
		}
		return numberAsString;
	}
}