import { Route } from './route.mjs';

export class RouteCollection {
	
	constructor(ioc) {
		const routes = [];

		this.getRoutes = () => [...routes]

		this.addRoute = route => {
			if(!(route instanceof Route)) {
				throw new Error('Invalid route type');
			}

			routes.push(route);
		}
	}
}