import Editar from 'views/editors';
import {attachEvent, editors} from 'webix';
import {JetView} from 'webix-jet';
import ApexCharts from 'apexcharts';
import * as webix from 'webix';
import axios from 'axios';
import {Contract, Feature} from '../entities/contract';
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
					scroll: 'Y',
					elements: [
						{
							view: 'text',
							label: 'Ваша почта',
							labelWidth: 100,
							name: 'email',
							required: true
						},
						{
							scroll: 'Y',
							template: `Права и обязанности:
	  <br><br>1. Цена за выбранные услуги после заключения договора не может быть изменена.
	  <br><br>2. Фирма обязуется в установленные сроки провести анализ результатов тестирования. В случае невыполнения этого условия заказчику будут возвращена вся уплаченная сумма.
	  <br><br>3. Фирма обязуется помогать заказчику с загрузкой результатов тестирования и дальнейшим проведением анализа.
	  <br><br>4. Для проведения анализа заказчик обязан предоставить корректные результаты тестирования в установленные договором сроки. В противном случае клиенту не будут возвращены деньги за оплаченные услуги.
 	  <br><br>5. Заказчик имеет право заключить договор и не воспользоваться услугами фирмы. В этом случае фирма не возвращает деньги заказчику
							`
						},
						{
							height: 25,
							template: `Доступные услуги:`,
						},
						{
							name: 'feat1',
							view: 'checkbox',
							labelRight: 'Выявление подозрительных заданий. Цена: 100руб.'
						}, {
							name: 'feat2',
							view: 'checkbox',
							labelRight: 'Объективная оценка трудности заданий. Цена: 100руб.'
						}, {
							localId: '',
							name: 'feat3',
							view: 'checkbox',
							labelRight: 'анализ статистики трудностей заданий и рекомендации по пополнению БТЗ заданиями нужной трудности. Цена: 100руб.'
						},
						{view: 'text', value: 'Наименование: ООО "Тестер"'},
						{
							view: 'text',
							value: 'Юридический адрес: 142100, Саратовская область, город Саратов, ул. Б. Серпуховская, дом 43, офис 2'
						},
						{view: 'text', value: 'ИНН адрес: 3664069397'},
						{view: 'text', value: 'р/с №: 40817810099910004312'},
						{view: 'text', value: 'БИК банка №: 02442666'},
						{view: 'text', value: 'Телефон: +7-994-232-32-21'},
						{
							view: 'text',
							value: 'Электронный адрес: tester@gmail.com'
						},

						{
							margin: 5, cols: [
								{
									localId: 'agree',
									view: 'button',
									value: 'Заключить договор',
									css: 'webix_primary'
								},
								{
									localId: 'downloadContract',
									view: 'button',
									value: 'Скачать договор',
									css: 'webix_primary',
									disabled: true,
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
			if (this.view.form.validate()) {
				let feats = [];
				const formValue = this.view.form.getValues();
				let contract = new Contract();
				if (formValue.feat1) {
					feats.push(1);
				}
				if (formValue.feat2) {
					feats.push(2);
				}
				if (formValue.feat2) {
					feats.push(3);
				}

				axios.post('concludeContract/' + formValue.email + '/' + feats).then(() => {
					webix.message('Договор составлен, теперь вы можете скачать его');
					;(this.$$('downloadContract') as any).enable();
				});
			}
		});
	}
}
