import { ClassService } from './modules/example/class.service.mjs';
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTER_TOKEN } from './modules/example/contracts.mjs';
import { App } from './framework/app.mjs';

const app = new App();
const ioc = app.run();

// const appTitle = ioc.use(APP_TITLE_TOKEN);
// const config = ioc.use(APP_CONFIG_TOKEN)
/**@type {ClassService} */
// const classServ = ioc.use(ClassService)
// const router = ioc.use(ROUTER_TOKEN)
// classServ.run();
// console.log(config);