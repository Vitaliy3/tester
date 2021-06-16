import Editar from 'views/editors';
import {checkPermissions} from 'views/top';
import {attachEvent, editors} from 'webix';
import {JetView} from 'webix-jet';
import ApexCharts from 'apexcharts';
import * as webix from 'webix';
import axios from 'axios';
import {Auth, getCookie} from '../entities/auth';
import RenameEditor from './analyseEditors/renameEditor';
import SendEditor from './analyseEditors/sendEditor';
import AnalyseResultsModel, {AnalyseResults} from '../entities/analyse';
import TaskModel, {Task} from '../entities/task';

export default class AuthView extends JetView {
	private view: {
		form: webix.ui.form
		buttons: {
			agree: webix.ui.button
			wrongPassword: webix.ui.button
		}
	};

	config() {
		return {
			rows: [
				{},
				{

					cols: [
						{},
						{
							view: 'form',
							localId: 'auth_form',
							elements: [
								{
									view: 'text',
									label: 'Введите логин',
									labelWidth: 150,
									name: 'login',
									required: true
								},
								{
									view: 'text',
									label: 'Введите пароль',
									labelWidth: 150,
									name: 'password',
									required: true
								},
								{
									margin: 5, cols: [
										{
											localId: 'agree',
											view: 'button',
											value: 'Войти',
											css: 'webix_primary'
										},
										{
											localId: 'wrongPassword',
											view: 'button',
											value: 'Восстановить пароль',
											css: 'webix_primary'
										},
									]
								}
							]
						},
						{}
					]
				},
				{}],

		};
	}

	// инциализация элементов представления
	init(view) {
		checkPermissions(this.app,this,true)
		this.view = {
			form: this.$$('contract_form') as webix.ui.form,
			buttons: {
				agree: this.$$('agree') as webix.ui.button,
				wrongPassword: this.$$('wrongPassword') as webix.ui.button,
			},
		};
		this.attachEvents();
	}


	public attachEvents(): void {
		this.view.buttons.agree.attachEvent('onItemClick', (row: any) => {
			// if(this.view.form.validate()){
			let authModel: Auth = new Auth();
			authModel.auth().then(() => {
				if (getCookie('rights')) {
					this.app.callEvent('onLogIn', []);
				}
			});
		});

		this.view.buttons.wrongPassword.attachEvent('onItemClick', (row: any) => {
		});

	}
}
