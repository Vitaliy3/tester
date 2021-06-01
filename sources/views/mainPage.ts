import {data} from 'models/records';
import {JetView} from 'webix-jet';
import * as webix from 'webix';


export default class MainPageView extends JetView {

	config() {
		var imagePath = 'https://docs.webix.com/samples/30_comments/common/imgs/';
		var usersData = [
			{id: 1, value: 'Corvo Attano', image: imagePath + 'corvo.jpg'},
			{id: 2, value: 'Daisy Fitzroy', image: imagePath + 'daisy.jpg'},
			{id: 3, value: 'Glenn Crake', image: imagePath + 'glenn.jpg'},
			{id: 4, value: 'Me', image: imagePath + 'tomek.jpg'},
			{id: 5, value: 'Leia Organa', image: imagePath + 'leia.jpg'}
		];
		var commentsData = [
			{
				id: 1,
				user_id: 1,
				date: '2018-06-10 18:45',
				text: 'Отличное приложение. Спасибо.'
			},
			{
				id: 2,
				user_id: 2,
				date: '2018-06-12 19:40',
				text: 'Это приложение мне очень помогло,мне удалось найти несколько некорректных вопросов в моем тесте'
			},
		];


		return {
			rows: [
				{
					template: `<div></div>`, height: 100,
				},
				{
					template: `<div style="text-align:center;font-size:20pt;">TESTER
              <br>
              <div style="font-size: 15pt">
                Анализириум и выяляем подозрительные тестовые задания 
                используя актуальные и надежные алгоритмы
                </div>
            </div>
<br>
           
        `,
					height: 200,
				},
				{

					rows: [
						{
							cols: [
								{
									rows:[
										{template:`<div style="text-align: center;font-size: 15pt">Пример результата анализа нашим приложением</div>`}



									]
								}
								,
								{
									view: 'comments',
									currentUser: 1,
									data: commentsData,
									users: usersData
								},

							]
						},
					]
				}

			],
		};
	}

	init(view): any {
	}
}
