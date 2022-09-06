import ExampleProvider from '../modules/example/example.provider.mjs';
import { ServiceProvider } from '../framework/serviceProvider.mjs';
import { loggerProvider } from '../modules/logger/logger.provider.mjs';

/**
 * @typedef AppConfig
 * @type {Object}
 * @property {Array.<ServiceProvider>} providers
 */

/** @type {AppConfig}  */
const appConfig = {//дает возможность регулировать очередность подключения провайдеров
	providers: [
		ExampleProvider,
		loggerProvider
	],
	foo: 'FOO'
}



export default appConfig;