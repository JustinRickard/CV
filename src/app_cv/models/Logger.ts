export interface ICvLogger {
	Error(message: string): void;
	Warning(message: string): void;
}

export class CvLogger {
	constructor () {

	}

	public Error (message: string): void {
		console.log("Error: " + message);
	}

	public Warning (message: string): void {
		console.log("Warning: " + message);
	}
}