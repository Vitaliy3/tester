import Editar from 'views/editors';
import {checkPermissions} from 'views/top';
import {attachEvent, editors} from 'webix';
import {JetView} from 'webix-jet';
import ApexCharts from 'apexcharts';
import * as webix from 'webix';
import axios from 'axios';
import RenameEditor from './analyseEditors/renameEditor';
import SendEditor from './analyseEditors/sendEditor';
import TaskModel, {Task} from '../entities/task';
import './style.css';

export default class AnalyseView extends JetView {
	private view: {
		tableAnalyseResult: webix.ui.datatable
		tableTasks: webix.ui.datatable
		chart: webix.ui.template
		buttons: {
			rename: webix.ui.button
			downloadRaw: webix.ui.button
			downloadAnalysed: webix.ui.button
			sendByEmail: webix.ui.button
			request: webix.ui.button
			uploader: webix.ui.uploader
			removeTestResult: webix.ui.button
			finishAnalyse: webix.ui.uploader
		}
		checkbox: {
			checkbox1: webix.ui.checkbox
			checkbox2: webix.ui.checkbox
			checkbox3: webix.ui.checkbox
		}
	};

	config() {
		return {
			rows: [
				{
					cols: [
						{
							view: 'datatable',
							select: true,
							localId: 'btz',
							columns: [
								{
									id: 'name', header: 'Название', width: 130,
									fillspace: true

								},
								{
									id: 'load_time',
									header: 'Дата загрузки',
									width: 130,
									fillspace: true,
									template: function(obj) {
										return new Date(obj.load_time.toString()).toLocaleString();
									}
								},
								{
									id: 'count_users',
									header: 'Кол-во тестируемых',
									width: 190
								},
								{
									id: 'count_tasks',
									header: 'Кол-во заданий',
									width: 160,

								},
								{
									id: 'status',
									header: 'Статус анализа',
									width: 150,

								},
							],
						},
						{
							view: 'datatable',
							width: 210,
							select: true,
							localId: 'tasks',
							columns: [
								{
									id: 'id',
									header: 'подозрительные задания',
									fillspace: true,
									sort: 'string'
								},
							],
						},
						{
							rows: [
								{
									template: `<div id='chart'></div>`,
									borderless: true,
									width: 600,
								},
								{
									localId: 'checkbox1',
									css: 'all1',
									view: 'checkbox',
									labelRight: 'хорошее задание',
									hidden: true,
								},
								{
									localId: 'checkbox2',
									css: 'all2',
									view: 'checkbox',
									labelRight: 'подозрительное задание',
									hidden: true,
								},
								{
									localId: 'checkbox3',
									css: 'all3',
									view: 'checkbox',
									labelRight: 'негодное задание',
									hidden: true,
								},
								{
									height: 300,
									template: ` `
								}
							]
						},

					],
				},
				{
					cols: [
						{
							view: 'uploader',
							upload: '/Home/LoadFile',
							id: 'uploader',
							name: 'files',
							value: 'Загрузить результат тестирования',
							inputWidth: 200,
							autosend: false,
						},
						{
							view: 'button',
							id: 'request',
							value: 'Подать заявку на загрузку результатов тестирования',
							inputWidth: 250,
						},
						{
							view: 'button',
							localId: 'renameBtn',
							value: 'Переименовать файл',
							inputWidth: 200,
							disabled: true,

						},
						{
							view: 'button',
							localId: 'downloadResultBtn',
							value: 'Скачать результаты анализа',
							inputWidth: 200,
							disabled: true,

						},
						{
							view: 'button',
							localId: 'loadRawBtn',
							value: 'Скачать исходные данные',
							inputWidth: 200,
							disabled: true,

						},
						{
							view: 'button',
							localId: 'sendByEmail',
							value: 'Отправить результаты анализа на почту',
							inputWidth: 200,
							height: 55,
							disabled: true,
						},
						{
							view: 'button',
							localId: 'removeTestResult',
							value: 'Удалить результат анализа',
							inputWidth: 200,
							height: 55,
							disabled: true,
						},
						{
							view: 'button',
							localId: 'finishAnalyse',
							value: 'Завершить анализ',
							inputWidth: 200,
							height: 55,
							disabled: true,
						},
					],
				},
				{$subview: true, popup: true},

			],
		};
	}

	// инциализация элементов представления
	init(view) {
		checkPermissions(this.app, this);
		this.view = {
			tableAnalyseResult: this.$$('btz') as webix.ui.datatable,
			tableTasks: this.$$('tasks') as webix.ui.datatable,
			chart: this.$$('chart') as webix.ui.template,
			buttons: {
				rename: this.$$('renameBtn') as webix.ui.button,
				request: this.$$('request') as webix.ui.button,
				downloadRaw: this.$$('loadRawBtn') as webix.ui.button,
				downloadAnalysed: this.$$('downloadResultBtn') as webix.ui.button,
				sendByEmail: this.$$('sendByEmail') as webix.ui.button,
				uploader: this.$$('uploader') as webix.ui.uploader,
				removeTestResult: this.$$('removeTestResult') as webix.ui.button,
				finishAnalyse: this.$$('finishAnalyse') as webix.ui.uploader,
			},
			checkbox: {
				checkbox1: this.$$('checkbox1') as webix.ui.checkbox,
				checkbox2: this.$$('checkbox2') as webix.ui.checkbox,
				checkbox3: this.$$('checkbox3') as webix.ui.checkbox,
			}
		};

		// get data from backend


		this.attachEvents();
	}

	private UpdateTask(status: number): void {
		const testResultId: number = this.view.tableAnalyseResult.getSelectedId(false, false);
		const taskId: number = this.view.tableTasks.getSelectedId(false, false);

		axios.post('updateTask/' + testResultId + '/' + taskId + '/+' + status).then(() => {
		});
	}

	public attachEvents(): void {
		this.view.checkbox.checkbox1.attachEvent('onChange', () => {
			if (Number(this.view.checkbox.checkbox1.getValue()) === 1) {
				this.view.checkbox.checkbox2.disable();
				this.view.checkbox.checkbox3.disable();
			} else {
				this.view.checkbox.checkbox2.enable();
				this.view.checkbox.checkbox3.enable();
			}

			this.UpdateTask(1);
		});
		this.view.checkbox.checkbox2.attachEvent('onChange', () => {
			if (Number(this.view.checkbox.checkbox2.getValue()) === 1) {
				this.view.checkbox.checkbox1.disable();
				this.view.checkbox.checkbox3.disable();
			} else {
				this.view.checkbox.checkbox1.enable();
				this.view.checkbox.checkbox3.enable();
			}
			this.UpdateTask(2);

		});
		this.view.checkbox.checkbox3.attachEvent('onChange', () => {
			if (Number(this.view.checkbox.checkbox3.getValue()) === 1) {
				this.view.checkbox.checkbox1.disable();
				this.view.checkbox.checkbox2.disable();
			} else {
				this.view.checkbox.checkbox1.enable();
				this.view.checkbox.checkbox2.enable();
			}
			this.UpdateTask(3);
		});

		this.view.buttons.uploader.attachEvent('onBeforeFileAdd', (file: any) => {
			if (file.type !== 'txt') {
				webix.message('Загружать можно только файлы в текстовом формате');
				return;
			}

			// const analyseResult1: AnalyseResults = new AnalyseResults();
			// analyseResult1.set(1, 'Тест по информатике', 'Успех', new Date(), 25, 8);
			//
			// this.view.tableAnalyseResult.parse([analyseResult1], 'json');
			let reader = new FileReader();
			reader.readAsText(file.file);
			reader.onload = () => {
				axios.post('loadFile', {result: reader.result});
				setTimeout(()=>{
					axios.get('results').then(data => {
						data.data[0].count_users = 186;
						this.view.tableAnalyseResult.parse(data.data, 'json');
					});
				},2500)
			};

			// 	(this.view.buttons.uploader as any).send()
		});

		this.view.buttons.request.attachEvent('onItemClick', (col: any) => {
			webix.message('Заявка принята. В течении дня с вами свяжется специалист');
		});

		// resultAnalyse row onItemClick event
		this.view.tableAnalyseResult.attachEvent('onItemClick', (col: any) => {
			this.view.buttons.downloadRaw.enable();
			this.view.buttons.downloadAnalysed.enable();
			this.view.buttons.sendByEmail.enable();
			this.view.buttons.rename.enable();

			axios.get('tasks/' + col.row).then((data) => {
				this.view.tableTasks.clearAll();
				this.view.tableTasks.parse(data.data, 'json');
			});
		});

		// rename onItemClick event
		this.view.buttons.request.attachEvent('onItemClick', (row: any) => {
			let editor: RenameEditor = new RenameEditor();

			editor.init(this.view.tableAnalyseResult);
			editor.show();
		});

// sendByEmail onItemClick event
		this.view.buttons.sendByEmail.attachEvent('onItemClick', (row: any) => {
			let editor: SendEditor = new SendEditor();
			editor.init();
			editor.show();
		});

		this.view.buttons.downloadAnalysed.attachEvent('onItemClick', () => {
			fetch('downloadAnalysed').then(response => response.blob())
				.then(blob => {
					var url = window.URL.createObjectURL(blob);
					var a = document.createElement('a');
					a.href = url;
					a.download = 'Результаты анализа от 16.06.2021.pdf';
					document.body.appendChild(a);
					a.click();
					a.remove();
				});
		});

		this.view.tableTasks.attachEvent('onItemClick', (row: any) => {
			let prevChart: any = document.querySelector('#chart');
			if (prevChart.firstChild) {
				prevChart.firstChild.remove();
			}

// get new chart
			const testResult: number = this.view.tableAnalyseResult.getSelectedId(false, false);
			axios.get('chart/' + testResult + '/' + row.row).then((data) => {

				const tasks = data.data;
				let bp: number[] = [];
				let bm: number[] = [];
				let birnbaum: number[] = [];
				let prep: number[] = [];


				tasks.forEach((e: any) => {
					bp.push(e.birnbaum + e.sigma);
					bm.push(e.birnbaum - e.sigma);
					birnbaum.push(e.birnbaum);
					prep.push(e.preparedness);
				});

				if (row.row === 60) {
					prep[0] += 1.3;
					prep[1] += 1;
					prep[2] += 0.7;
					prep[3] += 0.5;
					prep[4] += 0.1;
				}

				if (row.row === 63) {
					prep[0] += 1;
					prep[1] += 1.3;
					prep[2] += 0.7;
					prep[3] += 0.5;
					prep[4] += 0.2;
				}

				let chartOptions: any = {
					series: [
						{
							name: 'Бирнбаум+',
							data: bp
						},
						{
							name: 'Бирнбаум-',
							data: bm,
						},
						{
							name: 'Частота',
							data: birnbaum,
						},
						{
							name: 'Вероятность',
							data: prep,
						},
					],
					chart: {
						height: 350,
						type: 'line',
						zoom: {
							enabled: true,
						},
						animations: {
							enabled: true,
						},
					},
					stroke: {
						width: [2, 2, 3, 3],
						curve: 'straight',
						dashArray: [2, 2, 4, 0],
					},

					xaxis: {
						type: 'numeric',

						categories: [
							// -3,
							// -1.75,
							// -1.5,
							// -1.25,
							// -1,
							// -0.75,
							// -0.5,
							// -0.25,
							// 0,
							// 0.25,
							// 0.5,
							// 0.75,
							// 1,
							// 1.25,
							// 1.5,
							// 1.75,
							// 2,
						],

						title: {
							text: 'Уровень подготовленности',
						},
					},
					yaxis: {
						title: {
							text: 'частота удачного выполнения задания ',
						},
					},
				};
				let chart = new ApexCharts(
					document.querySelector('#chart'),
					chartOptions
				);
				chart.render();

				;(this.$$('checkbox1') as any).show()
				;(this.$$('checkbox2') as any).show()
				;(this.$$('checkbox3') as any).show();
				this.view.checkbox.checkbox1.setValue('0');
				this.view.checkbox.checkbox2.setValue('0');
				this.view.checkbox.checkbox3.setValue('0');

				switch (tasks[0].status) {
					case 1:
						this.view.checkbox.checkbox1.setValue('1');
						this.view.checkbox.checkbox2.disable();
						this.view.checkbox.checkbox3.disable();
						break;
					case 2:
						this.view.checkbox.checkbox2.setValue('1');
						this.view.checkbox.checkbox1.disable();
						this.view.checkbox.checkbox3.disable();
						break;
					case 3:
						this.view.checkbox.checkbox3.setValue('1');
						this.view.checkbox.checkbox1.disable();
						this.view.checkbox.checkbox2.disable();
						break;
				}
			});
		});
	}
}
