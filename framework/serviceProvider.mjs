import IoC from './IoC.mjs';

export class ServiceProvider {
	/**
	 * @param {IoC} ioc
	 */
	
	register(ioc) {//метод будет переопределен в дочерних классах
		throw new Error('Вызов метода Register из родительского класа запрещен')
	}
}