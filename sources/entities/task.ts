export class Task {
	public id: number;
	public levelOfPreparadness: number[];
	public executionFrequency: number[];
	public birnbaumPlus: number[];
	public birnbaumMinus: number[];

	public set(
		id: number,
		levelOfPreparadness: number[],
		executionFrequency: number[],
		birnbaumPlus: number[],
		birnbaumMinus: number[]
	) {
		this.id = id;
		this.levelOfPreparadness = levelOfPreparadness;
		this.executionFrequency = executionFrequency;
		this.birnbaumPlus = birnbaumPlus;
		this.birnbaumMinus = birnbaumMinus;
	}

	public getTasksByBankId(id: number): Promise<Task[]> {
		return new Promise((res) => {
			let task = new Task();
			const tasks: Task[] = [];
			if (id === 1) {
				task.set(9944482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(2324213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(3421342, [], [], [], []);
				tasks.push(task);
			} else if (id === 2) {
				task = new Task();
				task.set(22, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(322, [], [], [], []);
				tasks.push(task);
			}

			res(tasks);
		});
	}

	public getChart(taskId: number): Promise<Task> {
		console.log(taskId);
		return new Promise((res) => {
			const task = new Task();
			task.set(
				0,
				[
					0.09,
					0.2,
					0.27,
					0.33,
					0.38,
					0.43,
					0.46,
					0.53,
					0.6,
					0.63,
					0.69,
					0.75,
					0.9,
					1.05,
					null,
					null,
					null,
				],
				[
					null,
					null,
					null,
					null,
					0.6,
					0.5,
					0.4,
					0.25,
					0.3,
					0.3,
					0,
					null,
					null,
					null,
					null,
					null,
					null,
				],
				[
					0.25,
					0.3,
					0.37,
					0.43,
					0.48,
					0.53,
					0.56,
					0.63,
					0.7,
					0.73,
					0.79,
					0.85,
					1,
					1.25,
					null,
					null,
					null,
				],
				[
					0.05,
					0.1,
					0.17,
					0.23,
					0.28,
					0.33,
					0.36,
					0.43,
					0.5,
					0.53,
					0.59,
					0.65,
					0.75,
					0.9,
					null,
					null,
					null,
				]
			);

			res(task);
		});
	}
}

export default new Task();