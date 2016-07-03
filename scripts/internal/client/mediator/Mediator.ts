/// <reference path="Subscription.ts" />
/// <reference path="../Router.ts" />

interface IMediator {
	Publish(channelName: string, args: any): void;
	PublishChangePage(args: any);
	Subscribe(channelName: string, context: {}, func: Function): void
}

declare var UrlRouter: Router;

class Mediator {

	Channels: { [name: string]: ISubscription[]; }
	ChannelKeys: { [name: string]: string; }
	UrlRouter: Router;


	constructor(urlRouter: Router) {
		this.Channels = {};
		this.UrlRouter = urlRouter;
		this.Subscribe("ChangePage", this.UrlRouter, this.UrlRouter.NavigateTo);
	}

	public PublishChangePage(args: any) {
		this.Publish("ChangePage", args);
	}

	public Publish(channelName: string, args: any): void {
		if (!this.Channels[channelName]) {
			// TODO: Log error on error handler via mediator
			return;
		}

		var channel = this.Channels[channelName];
		var args = Array.prototype.slice.call(arguments, 1);

		channel.forEach((subscription) => {
			subscription.Func.apply(subscription.Context, args);
		});
	}

	public Subscribe(channelName: string, context: {}, func: Function): void {
		if (!this.Channels[channelName]) {
			this.Channels[channelName] = new Array<Subscription>();
		}
		var channel = this.Channels[channelName];
		channel.push(new Subscription(context, func));
	}
}