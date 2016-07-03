interface ISubscription {
	Context: {};
	Func: Function;
}

class Subscription {

	Context: {};
	Func: Function;

	constructor(
		context: {},
		func: Function
	) {
		this.Context = context;
		this.Func = func;
	}
}