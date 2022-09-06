import IoC from '../../framework/IoC.mjs';
import { ServiceProvider } from '../../framework/serviceProvider.mjs';
import { NotFoundRoute } from './404route.mjs';
import { AboutRoute } from './aboutRoute.mjs';
import { HomeRoute } from './homeRoute.mjs';
import { RouteCollection } from './routeCollection.mjs';
import { Router } from './router.mjs';

class RoutingProvider extends ServiceProvider {
	/**
  	* @param {IoC} ioc
  	*/
	register(ioc) {
		ioc.singleton(Router, () => new Router(ioc));
		ioc.singleton(RouteCollection, () => new RouteCollection());
		ioc.resolving(RouteCollection, (ctx) => {
			/**
			 * @type {RouteCollection}
			 */
			const routeCollection = ctx.instance;
			routeCollection.addRoute(new NotFoundRoute());
			return routeCollection;
		}),
		ioc.resolving(RouteCollection, (ctx) => {
			/**
 			* @type {RouteCollection}
			 */
			const routeCollection = ctx.instance;
			routeCollection.addRoute(new HomeRoute());
			routeCollection.addRoute(new AboutRoute());
			return routeCollection;
		})
	}
}

export const routingProvider = new RoutingProvider();