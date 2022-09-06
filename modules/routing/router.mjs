import { Route } from './route.mjs';
import { RouteCollection } from './routeCollection.mjs';

export class Router {
	
	constructor(ioc) {
		this.routeCollection = ioc.use(RouteCollection);
	}

	init() {
		window.onhashchange = () => {
			this.execute();
		}
	}

	execute() {
		/**
		 * @type {Array.<Route>}
		 */
		const routes = this.routeCollection.getRoutes();
		routes.sort((a, b) => a.sortOrder() - b.sortOrder());

		const hash = window.location.hash;
		for(let route of routes) {
			if(route.isMatch(hash)){
				route.render();
				console.log('Router.execute()');
				return;
			}
		}
		console.log(routes);
		console.error('Router.execute() route not found');

	}
}
