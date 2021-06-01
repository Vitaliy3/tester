import Editar from 'views/editors';
import {attachEvent, editors} from 'webix';
import {JetView} from 'webix-jet';
import ApexCharts from 'apexcharts';
import * as webix from 'webix';
import axios from 'axios';
import RenameEditor from './analyseEditors/renameEditor';
import SendEditor from './analyseEditors/sendEditor';
import AnalyseResultsModel, {AnalyseResults} from '../entities/analyse';
import TaskModel, {Task} from '../entities/task';

export default class StartView extends JetView {
	private view: {
		form: webix.ui.form
		buttons: {
			agree: webix.ui.button
		}
	};

	config() {
		return {
			rows: [
				{
					view: 'form',
					localId: 'contract_form',
					elements: [
						{
							view: 'text',
							label: 'Ваша почта',
							labelWidth: 100,
							name: 'email',
							required:true
						},
						{
							height: 100,
							scroll: 'Y',
							template: `Права и обязанности:
							`
						},
						{
							height: 100,
							scroll: 'Y',
							template: `Прочие условия договора:`
						},
						{
							height: 25,
							template: `Доступные услуги:`,
						},
						{
							localId: '',
							view: 'checkbox',
							labelRight: 'Выявление подозрительных заданий'
						}, {
							localId: '',

							view: 'checkbox',
							labelRight: 'Объективная оценка трудности заданий'
						}, {
							localId: '',
							view: 'checkbox',
							labelRight: 'анализ статистики трудностей заданий и рекомендации по пополнению БТЗ заданиями нужной трудности'
						},
						{
							margin: 5, cols: [
								{
									localId: 'agree',
									view: 'button',
									value: 'Заключить договор',
									css: 'webix_primary'
								},
							]
						}
					]
				},

			],

		};
	}

	// инциализация элементов представления
	init(view) {
		this.view = {
			form: this.$$('contract_form') as webix.ui.form,
			buttons: {
				agree: this.$$('agree') as webix.ui.button,

			},
		};


		// get data from backend
		// AnalyseResultsModel.getAllBanks().then((data: AnalyseResults[]) => {
		// 	this.view.tableAnalyseResult.parse(data, 'json');
		// });

		this.attachEvents();
	}

	public attachEvents(): void {
		// sendByEmail onItemClick event
		this.view.buttons.agree.attachEvent('onItemClick', (row: any) => {
		this.view.form.validate()

		});

	}
}
