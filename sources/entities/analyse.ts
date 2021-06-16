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
			analyseResult1.set(1, 'Тест по истории', 'Успех', new Date(), 326, 40);
			const analyseResult2: AnalyseResults = new AnalyseResults();
			analyseResult2.set(2, 'Тест по физике', 'Успех', new Date(), 757, 35);
			const analyseResult3: AnalyseResults = new AnalyseResults();
			analyseResult3.set(3, 'Тест по информатике', 'Ошибка', new Date(), 922, 30);
			const analyseResult4: AnalyseResults = new AnalyseResults();
			analyseResult4.set(4, 'Тест по программированию', 'В процессе', new Date(), 485, 35);
			const analyseResult5: AnalyseResults = new AnalyseResults();
			analyseResult5.set(5, 'Тестирование сотрудников предприятия', 'Успех', new Date(), 245, 25);

			 res([analyseResult1, analyseResult2, analyseResult3, analyseResult4, analyseResult5]);
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
		console.log('rename');
		return new Promise((resolve: any, rej) => {
			resolve();
		});
	}
}

export default new AnalyseResults();
