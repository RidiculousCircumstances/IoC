import { LoggerContract } from '../../framework/logger.contract.mjs';

export class ConsoleLogger extends LoggerContract {
	debug(...messages) {
		console.log(...messages);
	}

	info(...messages) {
		console.log(...messages);
	}

	error(...messages) {
		console.log(...messages);
	}
}