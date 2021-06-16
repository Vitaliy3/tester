import {IJetApp, JetView, plugins} from 'webix-jet';
import * as webix from 'webix';
import {Auth, getCookie, reviver} from '../entities/auth';
import './style.css';

let toolbar: {
	main: webix.ui.button
	contract: webix.ui.button
	analyse: webix.ui.button
	support: webix.ui.button
	contacts: webix.ui.button
	aboutCompany: webix.ui.button
	aboutMethod: webix.ui.button
	account: webix.ui.menu
	logIn: webix.ui.button
};

export default class TopView extends JetView {


	config() {
		var menu = {
			view: 'toolbar',
			id: 'top:menu',
			cols: [
				{
					localId: 'main',
					view: 'button',
					value: 'Главная',
					align: 'left',

				},
				{
					localId: 'contract',
					view: 'button',
					value: 'Заключение договора',
					align: 'left',

				},
				{
					localId: 'analyse',
					view: 'button',
					value: 'Анализ',
					align: 'left',

				},
				{
					view: 'menu',
					id: 'support',
					css: `menu`,
					width: 130,
					data: [
						{
							id: '2', value: 'Тех. Поддержка', submenu: [
								{value: 'Инструкция',},
								{value: 'Общение',}
							]
						},
					]
				},
				{
					localId: 'contacts',
					view: 'button',
					value: 'Контакты',
					align: 'left',

				},
				{
					localId: 'aboutCompany',
					view: 'button',
					value: 'О компании',
					align: 'left',

				},
				{
					localId: 'aboutMethod',
					view: 'button',
					value: 'О методологии',
					align: 'left',
				},
				{
					view: 'menu',
					localId: 'account',
					css: `menu`,
					width: 130,
					data: [
						{
							id: 'lk', value: 'Аккаунт', submenu: [
								{value: 'Личный кабинет',},
								{value: 'Выйти',}
							]
						},
					]
				},
				{
					localId: 'logIn',
					view: 'button',
					value: 'Войти',
					align: 'left',
					hidden: true,
				},
			],
		};

		var ui = {
			type: 'clean',
			paddingX: 5,
			css: 'app_layout',
			cols: [
				{
					paddingX: 5,
					paddingY: 10,
					rows: [
						menu,
						{
							type: 'wide',
							paddingY: 10,
							paddingX: 5,
							rows: [{$subview: true}],
						},
					],
				},
			],
		};

		return ui;
	}


	init() {
		toolbar = {
			main: this.$$('main') as webix.ui.button,
			contract: this.$$('contract') as webix.ui.button,
			analyse: this.$$('analyse') as webix.ui.button,
			support: this.$$('support') as webix.ui.button,
			contacts: this.$$('contacts') as webix.ui.button,
			aboutCompany: this.$$('aboutCompany') as webix.ui.button,
			aboutMethod: this.$$('aboutMethod') as webix.ui.button,
			account: this.$$('account') as webix.ui.menu,
			logIn: this.$$('logIn') as webix.ui.button
		};

		this.on(this.app, 'onLogIn', () => {
			checkPermissions(this.app);
			this.show('mainPage');
		});

		this.on(this.app, 'onLogOut', () => {
			let auth: Auth = new Auth();
			auth.deauth().then(() => {
				checkPermissions(this.app);
			});
		});

		toolbar.logIn.attachEvent('onItemClick', () => {
			this.show('auth');
		})

		;(this.$$('main') as webix.ui.button).attachEvent('onItemClick', () => {
			this.show('mainPage');
		});

		toolbar.analyse.attachEvent('onItemClick', () => {
			this.show('analyse');
		})

		;(this.$$('contract') as webix.ui.button).attachEvent('onItemClick', () => {
			this.show('contract');
		});

		const sub = toolbar.account.getSubMenu('lk');
		sub.attachEvent('onItemClick', (id) => {
			let item = sub.getItem(id);
			console.log(item.value);
			switch (item.value) {
				case 'Личный кабинет':
					this.show('account');
					break;
				case 'Выйти':
					this.app.callEvent('onLogOut', []);

			}
		});


		toolbar.support.attachEvent('onItemClick', () => {

		});
		this.use(plugins.Menu, 'top:menu');
	}


}

export function checkPermissions(app?: IJetApp, t?: JetView,auth?:boolean): void {


	let cookie = getCookie('rights');
	if (!cookie) {
		if (toolbar) {
			if (toolbar.contract) {
				toolbar.contract.hide();
			}
			if (toolbar.analyse) {
				toolbar.analyse.hide();

			}
			if (toolbar.support) {
				toolbar.support.hide();
			}
			if (toolbar.contacts) {
				toolbar.contacts.hide();

			}
			if (toolbar.aboutCompany) {
				toolbar.aboutCompany.hide();

			}
			if (toolbar.aboutMethod) {
				toolbar.aboutMethod.hide();

			}
			if (toolbar.account) {
				toolbar.account.hide();
			}
			if (toolbar.logIn) {
				toolbar.logIn.show();
			}
		}

		if (auth){
			t.show('auth')
			return;
		}

		if (t) {
			t.app.show('mainPage');
		} else {
			app.show('top/mainPage');
		}
		return;
	}
	if (toolbar.logIn) {
		toolbar.logIn.hide();
	}

	let rights: Map<string, boolean> = JSON.parse(getCookie('rights'), reviver);
	rights.forEach((value, key, map) => {
		let view = app.$$(key) as any;
		if (view) {
			view.show();
		}
	});
}

