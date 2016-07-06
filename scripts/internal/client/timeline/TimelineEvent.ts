/// <reference path="Asset.ts" />
/// <reference path="../Utilities.ts" />

class TimelineEvent {

	startDate: string;
    endDate: string;
    headline: string;
    text: string;
    tag: string;
    classname: string;
    asset: IAsset;

	constructor (
		startDate: string,
	    endDate: string,
	    headline: string,
	    text: string,
	    tag: string,
	    classname: string,
	    asset: IAsset
	) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.headline = headline;
		this.text = text;
		this.tag = tag;
		this.classname = classname;
		this.asset = asset;
	}
}