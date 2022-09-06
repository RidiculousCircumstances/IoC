import { Route } from './route.mjs';

export class NotFoundRoute extends Route {
	isMatch(hash) {
		return true;
	}

	sortOrder() {
		return 999999;
	}

	render() {
		console.log('Not Found route!');
	}
}