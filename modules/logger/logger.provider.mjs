import IoC from '../../framework/IoC.mjs';
import { LoggerContract } from '../../framework/logger.contract.mjs';
import { ServiceProvider } from '../../framework/serviceProvider.mjs';
import { ConsoleLogger } from './consoleLogger.mjs';

class LoggerProvider extends ServiceProvider {
	/**
	 * 
	 * @param {IoC} ioc 
	 */
	register(ioc) {
		ioc.singleton(LoggerContract, () => new ConsoleLogger(ioc))
	}

}

export const loggerProvider = new LoggerProvider();