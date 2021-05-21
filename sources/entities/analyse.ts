export class AnalyseResults {
	public id: number;
	public name: string;
	public status: string;
	public loadDate: Date;
	public countUsers: number;
	public countTasks: number;

	public set(
		id: number,
		name: string,
		status: string,
		loadDate: Date,
		countUsers: number,
		countTasks: number
	) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.loadDate = loadDate;
		this.countUsers = countUsers;
		this.countTasks = countTasks;
	}

	public getAllBanks(): Promise<AnalyseResults[]> {
		return new Promise((res: any) => {
			const analyseResult1: AnalyseResults = new AnalyseResults();
			analyseResult1.set(1, 'Тест по истории', 'Успех', new Date(), 5, 4);
			res([analyseResult1]);
		});
	}

	public sendByEmail(bankId: number, email: string): Promise<boolean> {
		return new Promise(() => {
		});
	}

	private upload(file: File): Promise<boolean> {
		return new Promise(() => {
		});
	}

	public downloadAnalysed(bankId: number): Promise<boolean> {
		return new Promise(() => {
		});
	}

	public downloadRaw(bankId: number): Promise<boolean> {
		return new Promise(() => {
		});
	}

	public rename(bankId: number, newName: string): Promise<AnalyseResults> {
		console.log("rename")
		return new Promise((resolve:any,rej) => {
			resolve()
		});
	}
}

export default new AnalyseResults();
