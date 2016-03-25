interface ILogger {
	Error(message: string): void;
	Warning(message: string): void;
}

class Logger {
	constructor () {

	}

	public Error (message: string) {
		console.log("Error: " + message);
	}

	public Warning (message: string) {
		console.log("Warning: " + message);
	}
}