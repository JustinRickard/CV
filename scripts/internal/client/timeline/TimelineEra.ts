// <reference path="../Utilities.ts" />
/// <reference path="TimelineText.ts" />
/// <reference path="TimelineDate.ts" />

interface ITimelineEra {
	start_date: TimelineDate;
	end_date: TimelineDate;
	text: TimelineText;
}

class TimelineEra implements ITimelineEra {

	start_date: TimelineDate;
	end_date: TimelineDate;
	text: TimelineText;

	constructor (
		startDate: TimelineDate,
		endDate: TimelineDate,
		text: TimelineText
	) {
		this.start_date = startDate;
		this.end_date = endDate;
		this.text = text;	     
	}

	private DateToString(date: Date): string {
		var day = this.To2Figures(date.getDate().toString());
		var month = this.To2Figures(date.getMonth().toString());

		return date.getFullYear() + "," + month + "," + day;
	}

	private To2Figures (numberAsString: string): string {
		if (numberAsString.length === 1)
		{
			numberAsString = "0" + numberAsString;
		}
		return numberAsString;
	}
}