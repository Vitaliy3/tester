import {JetView, plugins} from 'webix-jet';
import * as webix from 'webix';
import {getCookie, reviver} from '../entities/auth';
import './style.css'

export default class TopView extends JetView {
	private toolbar: {
		main: webix.ui.button
		contract: webix.ui.button
		analyse: webix.ui.button
		support: webix.ui.button
		contacts: webix.ui.button
		aboutCompany: webix.ui.button
		aboutMethod: webix.ui.button
		account: webix.ui.button
	};

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
					css:`menu`,
					width:130,
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
					localId: 'account',
					view: 'button',
					value: 'Аккаунт',
					align: 'left',


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
		this.toolbar = {
			main: this.$$('main') as webix.ui.button,
			contract: this.$$('contract') as webix.ui.button,
			analyse: this.$$('analyse') as webix.ui.button,
			support: this.$$('support') as webix.ui.button,
			contacts: this.$$('contacts') as webix.ui.button,
			aboutCompany: this.$$('aboutCompany') as webix.ui.button,
			aboutMethod: this.$$('aboutMethod') as webix.ui.button,
			account: this.$$('account') as webix.ui.button,
		};

		this.on(this.app, 'onLogIn', () => {
			this.checkPermissions();
		});

		this.on(this.app, 'onLogOut', () => {
			this.checkPermissions();
		})

		;(this.$$('main') as webix.ui.button).attachEvent('onItemClick', () => {
			this.show('mainPage');
		});
		this.toolbar.analyse.attachEvent('onItemClick', () => {
			this.show('analyse');
		})
		;(this.$$('contract') as webix.ui.button).attachEvent('onItemClick', () => {
			this.show('contract');
		});
		this.toolbar.account.attachEvent('onItemClick', () => {
			this.show('account');
		});
		this.toolbar.support.attachEvent('onItemClick', () => {

		});
		this.use(plugins.Menu, 'top:menu');
	}

	private checkPermissions(): void {
		let cookie = getCookie('rights');
		if (!cookie) {
			this.toolbar.contract.hide();
			this.toolbar.analyse.hide();
			this.toolbar.support.hide();
			this.toolbar.contacts.hide();
			this.toolbar.aboutCompany.hide();
			this.toolbar.aboutMethod.hide();
			return;
		}
		let rights: Map<string, boolean> = JSON.parse(getCookie('rights'), reviver);
		rights.forEach((value, key, map) => {
			let view = this.$$(key) as any;
			if (view) {
				view.show();
			}
		});
	}
}
