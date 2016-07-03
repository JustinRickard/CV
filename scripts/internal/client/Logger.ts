interface ILogger {
	Error(message: string): void;
	Warning(message: string): void;
}

class Logger {
	constructor () {

	}

	public Error (message: string): void {
		console.log("Error: " + message);
	}

	public Warning (message: string): void {
		console.log("Warning: " + message);
	}
}