import * as webix from 'webix';

export default class SendEditor {
	private view: any;
	private buttons: {
		confirm: webix.ui.button
		cancel: webix.ui.button
	};

	private config(): any {
		return {
			view: 'window',
			id: 'renameWindow',
			position: 'center',
			head: 'Отправка результатов анализа на почту',
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
										label: 'Почта',
										labelWidth: 105,
										tooltip: 'Почта',
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
								label: 'Отправить',
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

	public init(): void {
		this.view = webix.ui(this.config());
		this.buttons = {
			confirm: webix.$$('confirm') as webix.ui.button,
			cancel: webix.$$('cancel') as webix.ui.button,
		};
		this.attachEvents();
	}

	public show(): void {
		this.view.show();
	}

	public close(): void {
		this.view.destructor();
	}

	private attachEvents(): void {
		this.buttons.confirm.attachEvent('onItemClick', () => {
			webix.message('Успешно отправлено');
			this.close();
		});

		this.buttons.cancel.attachEvent('onItemClick', () => {
			this.view.destructor();
		});
	}
}
