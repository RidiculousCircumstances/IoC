import { Route } from './route.mjs';

export class AboutRoute extends Route {
	isMatch(hash) {
		return hash === '#about';
	}

	sortOrder() {
		return 20;
	}

	render() {
		console.log('About route');
	}
}