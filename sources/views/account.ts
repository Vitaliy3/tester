import {strict} from 'assert';
import Editar from 'views/editors';
import {checkPermissions} from 'views/top';
import {attachEvent, editors} from 'webix';
import {JetView} from 'webix-jet';
import ApexCharts from 'apexcharts';
import * as webix from 'webix';
import axios from 'axios';
import {Auth} from '../entities/auth';
import {Contract, Feature} from '../entities/contract';
import RenameEditor from './analyseEditors/renameEditor';
import SendEditor from './analyseEditors/sendEditor';
import AnalyseResultsModel, {AnalyseResults} from '../entities/analyse';
import TaskModel, {Task} from '../entities/task';

export default class AccountView extends JetView {
	private view: {
		contracts: webix.ui.list,
		form: webix.ui.form
		buttons: {
			changeLogin: webix.ui.button
			changePass: webix.ui.button
		}
	};

	config() {
		return {
			rows: [
				{
					cols: [
						{
							rows: [
								{
									view: 'button',
									localId: 'change_login',
									value: 'Изменить логин',
									inputWidth: '200',
									width: 200,

								},
								{
									view: 'button',
									localId: 'change_password',
									value: 'Изменить логин',
									inputWidth: '200',
									width: 200,

								},
								{
									view: 'button',
									localId: 'show_contracts',
									value: 'Заключенные договора',
									inputWidth: '200',
									width: 200,

								},
							]
						},
						{
							view: 'list',
							localId: 'contracts_list',
							select: true,
							template: '#name#',
							width: 200,
						},
						{
							view: 'form',
							localId: 'contract_info',
							elements: [
								{
									view: 'text',
									name: 'name',
									label: 'Номер договора',
									labelWidth: 200,
									readonly: true,

								},
								{
									view: 'text',
									name: 'date_conclusion',
									label: 'Дата заключения',
									labelWidth: 200,
									readonly: true,


								},
								{
									view: 'text',
									name: 'start_date',
									label: 'Дата вступления в силу',
									labelWidth: 200,
									readonly: true,


								},
								{
									view: 'text',
									name: 'end_date',
									label: 'Дата окончания',
									labelWidth: 200,
									readonly: true,

								},
								{
									view: 'text',
									name: 'featuresStr',
									label: 'Доступный функционал',
									labelWidth: 200,
									readonly: true,

								},
								{
									view: 'text',
									name: 'execution_status',
									label: 'Статус договора',
									labelWidth: 200,
									readonly: true,


								},
							]
						}
					],
				},
			],
		};
	}

	// инциализация элементов представления
	init(view) {
		checkPermissions(this.app,this)
		this.view = {
			contracts: this.$$('contracts_list') as webix.ui.list,
			form: this.$$('contract_info') as webix.ui.form,
			buttons: {
				changeLogin: this.$$('change_login') as webix.ui.button,
				changePass: this.$$('change_password') as webix.ui.button,
			},
		};

		axios.get('/getContracts').then(data => {
			data.data.forEach((contract: Contract) => {
				this.view.contracts.add(
					{id: contract.id, name: contract.name},
				);
			});
		});
		this.attachEvents();
	}


	public attachEvents(): void {

		this.view.contracts.attachEvent('onItemClick', (id: string) => {
			axios.get('/getContracts').then(data => {
				data.data.forEach((contract: Contract) => {
					if (contract.id.toString() === id) {
						contract.featuresStr = function(): string {
							let splitted = '';
							for (let i = 0; i < contract.features.length; i++) {
								if (contract.features.length - 1 == i) {
									splitted += contract.features[i].description;
								} else {
									splitted += contract.features[i].description + ', ';
								}
							}
							return splitted;
						}();

						contract.start_date = new Date(contract.start_date.toString()).toLocaleString();
						contract.end_date = new Date(contract.end_date.toString()).toLocaleString();
						contract.date_conclusion = new Date(contract.date_conclusion.toString()).toLocaleString();
						this.view.form.parse(contract, 'json');
					}
				});
			});
		});


	};
}
