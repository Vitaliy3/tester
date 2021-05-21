import * as webix from 'webix';
import {JetView} from 'webix-jet';
import AnalyseResultsModel, {AnalyseResults} from '../entities/analyse';

export default class Editar extends JetView{
	private view: any;
	private parentView: any;
	private buttons: {
		confirm: webix.ui.button
		cancel: webix.ui.button
	};
	private form: webix.ui.form;

	public config(): any {
		return {
			view: 'window',
			id: 'renameWindow',
			position: 'center',
			head: 'Переименование файла',
			modal: true,
			width: 500,
			body: {
				rows: [
					{
						view: 'form',
						id: 'renameForm',
						elements: [
							{
								rows: [
									{
										id: 'name',
										name: 'name',
										view: 'text',
										inputHeight: 30,
										label: 'Название',
										labelWidth: 105,
										tooltip: 'Название',
										required: true,
									},
								],
							},
						],
					},
					{
						cols: [
							{
								view: 'button',
								id: 'confirm',
								label: 'Сохранить',
								type: 'form',
							},
							{
								view: 'button',
								id: 'cancel',
								label: 'Отмена',
								type: 'danger',
							},
						],
					},
				],
			},
		};
	}

	public setName(name: string): void {
		;(webix.$$('name') as webix.ui.text).setValue(name);
	}

	public init(y): any {
		console.log(y)
		this.buttons = {
			confirm: webix.$$('confirm') as webix.ui.button,
			cancel: webix.$$('cancel') as webix.ui.button,
		};
		this.form = webix.$$('renameForm') as webix.ui.form;
		this.attachEvents();
	}
	public close(): void {
		this.view.destructor();
	}

	private attachEvents(): void {
		this.buttons.confirm.attachEvent('onItemClick', () => {
			let formData: any = this.form.getValues();

			let selectedBank: AnalyseResults = this.parentView.getSelectedItem();
			AnalyseResultsModel.rename(selectedBank.id, formData.name).then((res: AnalyseResults) => {
				this.parentView.updateItem(selectedBank.id, formData);
			}).catch((reason: any) => {
				console.log(reason);
			});
		});

		this.buttons.cancel.attachEvent('onItemClick', () => {
			this.show('../')
		});
	}
}
