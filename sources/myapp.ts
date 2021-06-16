import {checkPermissions} from 'views/top';
import {JetApp} from 'webix-jet';
import './styles/app.css';
import * as webix from 'webix';
import {getCookie, reviver} from './entities/auth';
import TopView from './views/mainPage';

declare var APPNAME;
declare var VERSION;
declare var PRODUCTION;
declare var BUILD_AS_MODULE;

export default class Myapp extends JetApp {
	constructor(config = {}) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			debug: !PRODUCTION,
			start: '/top/mainPage',
			views: function(url: string): any {
			},
			webix,
		};
		super({...defaults, ...config});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new Myapp().render());
}
