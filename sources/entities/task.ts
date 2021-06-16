import axios from 'axios';
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
				task.set(12, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(14, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(177, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(286, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(287, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(288, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(334, [], [], [], []);
				tasks.push(task);

				task = new Task();
				task.set(335, [], [], [], []);
				tasks.push(task);
			}

			res(tasks);
		});
	}

	public getChart(taskId: number): Promise<Task> {
		return axios.get('chart').then((data:any)=>{
			return data
		})

		return new Promise((res) => {
			console.log(taskId);
			var xml = ``;
			if (taskId == 12) {
				xml =
					`
<ArrayOfPocket 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
xmlns="http://tempuri.org/">
	<Pocket>
		<Qualification>0.69</Qualification>
		<Qualification>0.31</Qualification>
		<Qualification>0.86</Qualification>
		<Qualification>0.22</Qualification>
		<Qualification>0.17</Qualification>
		<Qualification>0.43</Qualification>
		<Qualification>0.5</Qualification>
		<Qualification>0.36</Qualification>
		<Frequency>0.126</Frequency>
		<Frequency>0.139</Frequency>
		<Frequency>0.146</Frequency>
		<Frequency>0.121</Frequency>
		<Frequency>0.159</Frequency>
		<Frequency>0.116</Frequency>
		<Frequency>0.131</Frequency>
		<Frequency>0.109</Frequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<Sigma>0.485</Sigma>
		<Sigma>0.499</Sigma>
		<Sigma>0.496</Sigma>
		<Sigma>0.522</Sigma>
		<Sigma>0.536</Sigma>
		<Sigma>0.485</Sigma>
		<Sigma>0.467</Sigma>
		<Sigma>0.472</Sigma>
	</Pocket>	
</ArrayOfPocket>`;
			}
			if (taskId == 14) {
				xml =
					`
<ArrayOfPocket 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
xmlns="http://tempuri.org/">
	<Pocket>
		<Qualification>0.19</Qualification>
		<Qualification>0.21</Qualification>
		<Qualification>0.36</Qualification>
		<Qualification>0.42</Qualification>
		<Qualification>0.57</Qualification>
		<Qualification>0.673</Qualification>
		<Qualification>0.7</Qualification>
		<Qualification>0.86</Qualification>
		<Frequency>0.1</Frequency>
		<Frequency>0.239</Frequency>
		<Frequency>0.346</Frequency>
		<Frequency>0.421</Frequency>
		<Frequency>0.559</Frequency>
		<Frequency>0.616</Frequency>
		<Frequency>0.761</Frequency>
		<Frequency>0.909</Frequency>
		<BirnbaumFrequency>0.1</BirnbaumFrequency>
		<BirnbaumFrequency>0.125</BirnbaumFrequency>
		<BirnbaumFrequency>0.225</BirnbaumFrequency>
		<BirnbaumFrequency>0.467</BirnbaumFrequency>
		<BirnbaumFrequency>0.5</BirnbaumFrequency>
		<BirnbaumFrequency>0.55</BirnbaumFrequency>
		<BirnbaumFrequency>0.75</BirnbaumFrequency>
		<BirnbaumFrequency>0.9</BirnbaumFrequency>
		<Sigma>0.485</Sigma>
		<Sigma>0.499</Sigma>
		<Sigma>0.496</Sigma>
		<Sigma>0.522</Sigma>
		<Sigma>0.536</Sigma>
		<Sigma>0.485</Sigma>
		<Sigma>0.467</Sigma>
		<Sigma>0.472</Sigma>
	</Pocket>	
</ArrayOfPocket>`;
			}


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
			let sigma:any[] = parseTextPoint(parsedObj.Sigma);
			let birnbaum:any[] = parseTextPoint(parsedObj.BirnbaumFrequency);
			for (let i in sigma) {
				this.birnbaumPlus.push(birnbaum[i] + sigma[i]);
				this.birnbaumMinus.push(birnbaum[i] - sigma[i]);
			}
			const task = new Task();
			task.executionFrequency = this.executionFrequency;
			task.levelOfPreparadness = this.levelOfPreparadness;
			task.birnbaumPlus = this.birnbaumPlus;
			task.birnbaumMinus = this.birnbaumMinus;
			// task.set(
			// 	0,
			// 	[
			// 		0.09,
			// 		0.2,
			// 		0.27,
			// 		0.33,
			// 		0.38,
			// 		0.43,
			// 		0.46,
			// 		0.53,
			// 		0.6,
			// 		0.63,
			// 		0.69,
			// 		0.75,
			// 		0.9,
			// 		1.05,
			// 		null,
			// 		null,
			// 		null,
			// 	],
			// 	[
			// 		null,
			// 		null,
			// 		null,
			// 		null,
			// 		0.6,
			// 		0.5,
			// 		0.4,
			// 		0.25,
			// 		0.3,
			// 		0.3,
			// 		0,
			// 		null,
			// 		null,
			// 		null,
			// 		null,
			// 		null,
			// 		null,
			// 	],
			// 	[
			// 		0.25,
			// 		0.3,
			// 		0.37,
			// 		0.43,
			// 		0.48,
			// 		0.53,
			// 		0.56,
			// 		0.63,
			// 		0.7,
			// 		0.73,
			// 		0.79,
			// 		0.85,
			// 		1,
			// 		1.25,
			// 		null,
			// 		null,
			// 		null,
			// 	],
			// 	[
			// 		0.05,
			// 		0.1,
			// 		0.17,
			// 		0.23,
			// 		0.28,
			// 		0.33,
			// 		0.36,
			// 		0.43,
			// 		0.5,
			// 		0.53,
			// 		0.59,
			// 		0.65,
			// 		0.75,
			// 		0.9,
			// 		null,
			// 		null,
			// 		null,
			// 	]
			// );
			res(task);
		});
	}
}

export default new Task();