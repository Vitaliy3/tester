import parser from 'xml-js';

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
				task.set(1232, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(54222, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(3213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(23242131, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(34213422, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(99444823, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(23242134, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(34213425, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(99444826, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(27324213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(34218342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(99444982, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232410213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342111342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(991244482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(2324213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342113342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994448214, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232154213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342161342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994417482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(231824213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(341921342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994204482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232422113, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342221342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994234482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232244213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342251342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(926944482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232427213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(328421342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994294482, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232304213, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342131342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994443282, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(232421333, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(342134342, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(994443582, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(99442, [], [], [], []);
				tasks.push(task);

			}

			res(tasks);
		});
	}

	public getChart(taskId: number): Promise<Task> {

		return new Promise((res) => {
			var xml =
				`
<ArrayOfPocket 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
xmlns="http://tempuri.org/">
	<Pocket>
		<Qualification>0.69</Qualification>
		<Qualification>0.61</Qualification>
			<Qualification>0.56</Qualification>
		<Frequency>0.61</Frequency>
		<Frequency>0.49</Frequency>
		<Frequency>0.56</Frequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<Sigma>0.485</Sigma>
		<Sigma>0.499</Sigma>
		<Sigma>0.496</Sigma>
	</Pocket>	
</ArrayOfPocket>`;


			let parsedJson = parser.xml2json(xml, {compact: true});
			let parsedObj = JSON.parse(parsedJson).ArrayOfPocket.Pocket;
			let parseTextPoint = function(array: any): any {
				let parsed = [];
				array.forEach(e => {
					parsed.push(Number(e._text));
				});
				return parsed;
			};

			this.executionFrequency = parseTextPoint(parsedObj.Frequency);
			this.levelOfPreparadness = parseTextPoint(parsedObj.Qualification);

			// calc B+ B-
			this.birnbaumPlus = [];
			this.birnbaumMinus = [];
			let sigma = parseTextPoint(parsedObj.Sigma);
			let birnbaum = parseTextPoint(parsedObj.BirnbaumFrequency);
			for (let i in sigma) {
				this.birnbaumPlus.push(birnbaum[i] + sigma[i]);
				this.birnbaumMinus.push(birnbaum[i] - sigma[i]);
			}
			const task = new Task();
			task.executionFrequency = this.executionFrequency;
			task.levelOfPreparadness = this.levelOfPreparadness;
			task.birnbaumPlus = this.birnbaumPlus;
			task.birnbaumMinus = this.birnbaumMinus;
			console.log(this.executionFrequency);
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