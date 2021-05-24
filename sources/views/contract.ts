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
		tableAnalyseResult: webix.ui.datatable
		tableTasks: webix.ui.datatable
		chart: webix.ui.template
		buttons: {
			rename: webix.ui.button
			downloadRaw: webix.ui.button
			downloadAnalysed: webix.ui.button
			sendByEmail: webix.ui.button
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
									id: 'name', header: 'Название', width: 200,
									fillspace: true
								},
								{
									id: 'loadDate',
									header: 'Дата загрузки',
									width: 100
								},
								{
									id: 'countUsers',
									header: 'Кол-во тестируемых',
									width: 80
								},
								{
									id: 'countTasks',
									header: 'Кол-во заданий',
									width: 80
								},
								{
									id: 'status',
									header: 'Статус анализа',
									width: 80
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
									header: 'Идентификатор задания',
									fillspace: true,
								},
							],
						},
						{
							body: {
								template: `<div id='chart'></div>`,
								borderless: true,
								width: 600,
							},
						},
					],
				},
				{
					cols: [
						{
							view: 'uploader',
							upload: '//docs.webix.com/samples/server/upload',
							id: 'files',
							name: 'files',
							value: 'Загрузить данные',
							inputWidth: 200,
							hidden: true,
						},
						{
							view: 'button',
							localId: 'renameBtn',
							value: 'Переименовать файл',
							inputWidth: 200,
							disabled: true,
							hidden: true,

						},
						{
							view: 'button',
							localId: 'downloadResultBtn',
							value: 'Скачать результаты анализа',
							inputWidth: 200,
							disabled: true,
							hidden: true,

						},
						{
							view: 'button',
							localId: 'loadRawBtn',
							value: 'Скачать исходные данные',
							inputWidth: 200,
							disabled: true,
							hidden: true,

						},
						{
							view: 'button',
							localId: 'sendByEmail',
							value: 'Отправить результаты анализа на почту',
							inputWidth: 200,
							height: 55,
							disabled: true,
							hidden: true,
						},
					],
				},
				{$subview: true, popup: true},

			],
		};
	}

	// инциализация элементов представления
	init(view) {
		this.view = {
			tableAnalyseResult: this.$$('btz') as webix.ui.datatable,
			tableTasks: this.$$('tasks') as webix.ui.datatable,
			chart: this.$$('chart') as webix.ui.template,
			buttons: {
				rename: this.$$('renameBtn') as webix.ui.button,
				downloadRaw: this.$$('loadRawBtn') as webix.ui.button,
				downloadAnalysed: this.$$('downloadResultBtn') as webix.ui.button,
				sendByEmail: this.$$('sendByEmail') as webix.ui.button,
			},
		};
		this.view.buttons.rename.show();
		this.view.buttons.downloadRaw.show();
		this.view.buttons.downloadAnalysed.show();
		this.view.buttons.sendByEmail.show();

		// get data from backend
		AnalyseResultsModel.getAllBanks().then((data: AnalyseResults[]) => {
			this.view.tableAnalyseResult.parse(data, 'json');
		});

		this.attachEvents();
	}

	public attachEvents(): void {
		// resultAnalyse row onItemClick event
		this.view.tableAnalyseResult.attachEvent('onItemClick', (col: any) => {
			this.view.buttons.downloadRaw.enable();
			this.view.buttons.downloadAnalysed.enable();
			this.view.buttons.sendByEmail.enable();
			this.view.buttons.rename.enable();

			TaskModel.getTasksByBankId(col.row).then((data: Task[]) => {
				this.view.tableTasks.clearAll();
				this.view.tableTasks.parse(data, 'json');
			});
		});
		// rename onItemClick event
		this.view.buttons.rename.attachEvent('onItemClick', (row: any) => {
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
			this.show('./editors');
		});
		this.view.tableTasks.attachEvent('onItemClick', (row: any) => {
			// remove prev chart
			let prevChart: any = document.querySelector('#chart');
			if (prevChart.firstChild) {
				prevChart.firstChild.remove();
			}
			// get new chart

			TaskModel.getChart(row.row).then((task: Task) => {
				let chartOptions: any = {
					series: [
						{
							name: 'B+',
							data: task.birnbaumPlus,
						},
						{
							name: 'B-',
							data: task.birnbaumMinus,
						},
						{
							name: 'Частота',
							data: task.levelOfPreparadness,
						},
						{
							name: 'Вероятность',
							data: task.executionFrequency,
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
						width: [1, 1, 2, 2],
						curve: 'straight',
						dashArray: [2, 2, 4, 0],
					},

					xaxis: {
						type: 'numeric',

						categories: [
							-2,
							-1.75,
							-1.5,
							-1.25,
							-1,
							-0.75,
							-0.5,
							-0.25,
							0,
							0.25,
							0.5,
							0.75,
							1,
							1.25,
							1.5,
							1.75,
							2,
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
			});
		});
	}
}
