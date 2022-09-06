import appConfig from '../../configs/appConfig.mjs';
import IoC from '../../framework/IoC.mjs';
import { ServiceProvider } from '../../framework/serviceProvider.mjs';
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTER_TOKEN } from './contracts.mjs';


class ExampleProvider extends ServiceProvider {

	/**
 	* @param {IoC} ioc
 	*/
	register(ioc) {
		// регистрация строки
		ioc.singleton(APP_TITLE_TOKEN, () => 'Это заголовок')
		ioc.resolving(APP_TITLE_TOKEN, (ctx) => 'Модифицирован! ' + ctx.instance) // передаем хэндлер. Он регистрируется, и при создании 
		//синглтона модифицируется

		//регистрация глобального конфига
		ioc.singleton(APP_CONFIG_TOKEN, () => {
			const{providers, ...config} = appConfig;
			return config;
		})

		ioc.resolving(APP_CONFIG_TOKEN, (ctx) => {
			//Мутабельный подход!
			// ctx.instance.bar = ctx.ioc.use(APP_TITLE_TOKEN)
			// return ctx.instance;
			return {
				...ctx.instance,
				title: ctx.ioc.use(APP_TITLE_TOKEN)
			}
		})

		//регистрация сервиса-класса
		// ioc.singleton(ClassService, () => new ClassService(ioc));

		//регистрация контейнера для однотипных данных
		ioc.singleton(
			ROUTER_TOKEN,
			() => []
		)

		ioc.resolving(ROUTER_TOKEN, ctx => {
			ctx.instance.push({
				path: '/',
				title: 'Home page'
			})

			ctx.instance.push({
				path: '/sss',
				title: 'Home page'
			})
			return ctx.instance;
		})
	}
}

export const exampleProvider = new ExampleProvider();