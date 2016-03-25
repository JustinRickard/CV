interface IAsset {
	media: string;
	thumbnail: string;
	credit: string;
	caption: string;
}

class Asset {

	media: string;
	thumbnail: string;
	credit: string;
	caption: string;

	constructor (
		media: string,
		thumbnail: string,
		credit: string,
		caption: string
	) {
		this.media = media;
		this.thumbnail = thumbnail;
		this.credit = credit;
		this.caption = caption;
	}
}