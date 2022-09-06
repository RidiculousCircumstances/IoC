import { ServiceProvider } from './serviceProvider.mjs';
import IoC from './IoC.mjs';
import appConfig from '../configs/appConfig.mjs';
import { LoggerContract } from './logger.contract.mjs';
import { Router } from '../modules/routing/router.mjs';

export class App {
	run() {
		const ioc = new IoC();
		for (let serviceProvider of appConfig.providers) {
			if (!(serviceProvider instanceof ServiceProvider)) {
				throw new Error('Некорректный инстанс провайдера');
			}
			serviceProvider.register(ioc);
		}
		


		/**
		 * @type {Router}
		 */
		const router = ioc.use(Router);
		router.init();

		/**
		 * @type {LoggerContract}
		 */
		const logger = ioc.use(LoggerContract);
		logger.info('Приложение успешно запущено');
		return ioc;
	}
}