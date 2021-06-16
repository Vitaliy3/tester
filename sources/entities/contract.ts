export class Contract {
	public id: number;
	public name: string;
	public date_conclusion: string;
	public start_date: string;
	public end_date: string;
	public conditions: string[];
	public pay_status: string;
	public execution_status: string;
	public features: Feature[];
	public featuresStr: string;

	constructor() {
	}

	private getAll(): Promise<Contract[]> {
		return new Promise(() => {
		});
	}

	private edit(contract: Contract): Promise<Contract> {
		return new Promise(() => {
		});
	}

	private add(contract: Contract): Promise<Contract> {
		0;
		return new Promise(() => {
		});
	}

	private terminate(id: number): Promise<boolean> {
		return new Promise(() => {
		});
	}
}

export class Feature {
	public id: number;
	public description: string;

	constructor(id: number, desc: string) {
		this.id = id;
		this.description = desc;
	}

}

enum PayStatus {
	paid = 'paid',
	notPaid = 'notPaid',
}

enum ExecutionStatus {
	completed = 'completed',
	notCompleted = 'notCompleted',
	compliting = 'compliting',
}
