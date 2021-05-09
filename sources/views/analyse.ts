import { JetView } from "webix-jet"
import ApexCharts from "apexcharts"
import * as webix from "webix"
import axios from "axios"
import RenameEditor from "./analyseEditors/renameEditor"
import { Analyse, Task } from "../entities/analyse"

export default class StartView extends JetView {
  private view: {
    tableBtz: webix.ui.datatable
    tableTasks: webix.ui.datatable
    buttons: {
      rename: webix.ui.button
      downloadRaw: webix.ui.button

      dowloadAnalysed: webix.ui.button
      sendByEmail: webix.ui.button
    }
  }
  config() {
    return {
      rows: [
        {
          cols: [
            {
              view: "datatable",
              select: true,
              localId: "btz",
              columns: [
                { id: "name", header: "Название", width: 200 },
                { id: "loadDate", header: "Дата загрузки", width: 100 },
                { id: "countUsers", header: "Кол-во тестируемых", width: 80 },
                { id: "countTasks", header: "Кол-во заданий", width: 80 },
                { id: "status", header: "Статус анализа", width: 80 },
              ],
            },
            {
              view: "datatable",
              width: 200,
              select: true,
              localId: "tasks",
              columns: [
                {
                  id: "id",
                  header: "Идентификатор",
                  width: 100,
                  fillspace: true,
                },
              ],
            },
            {
              body: {
                template: "<div id='chart'></div>",
                borderless: true,
                width: 600,
                height: 400,
              },
            },
          ],
        },
        {
          cols: [
            {
              view: "uploader",
              upload: "//docs.webix.com/samples/server/upload",
              id: "files",
              name: "files",
              value: "Загрузить данные",
              inputWidth: 200,
            },
            {
              view: "button",
              localId: "renameBtn",
              value: "Переименовать файл",
              inputWidth: 200,
              disabled: true,
            },
            {
              view: "button",
              localId: "downloadResultBtn",
              value: "Скачать результаты анализа",
              inputWidth: 200,
              disabled: true,
            },
            {
              view: "button",
              localId: "loadRawBtn",
              value: "Скачать исходные данные",
              inputWidth: 200,
              disabled: true,
            },
            {
              view: "button",
              localId: "sendByEmail",
              value: "Отправить результаты анализа на почту",
              inputWidth: 200,
              height: 55,
              disabled: true,
            },
          ],
        },
      ],
    }
  }

  init(view) {
    this.view = {
      tableBtz: this.$$("btz") as webix.ui.datatable,
      tableTasks: this.$$("tasks") as webix.ui.datatable,
      buttons: {
        rename: this.$$("renameBtn") as webix.ui.button,
        downloadRaw: this.$$("loadRawBtn") as webix.ui.button,
        dowloadAnalysed: this.$$("downloadResultBtn") as webix.ui.button,
        sendByEmail: this.$$("sendByEmail") as webix.ui.button,
      },
    }

    let analyseModel: Analyse = new Analyse(0, "", "", new Date(), 0, 0)
    analyseModel.getAllBanks().then((data: Analyse[]) => {
      this.view.tableBtz.parse(data, "json")
    })

    this.view.tableBtz.attachEvent("onItemClick", (col: any) => {
      this.view.buttons.downloadRaw.enable()
      this.view.buttons.dowloadAnalysed.enable()
      this.view.buttons.sendByEmail.enable()
      this.view.buttons.rename.enable()

      let tasksModel: Task = new Task(0, [], [], [], [])
      tasksModel.getTasksByBankId(col.row).then((data: Task[]) => {
        this.view.tableTasks.clearAll()
        this.view.tableTasks.parse(data, "json")
      })
    })
    this.view.buttons.rename.attachEvent("onItemClick", (row: any) => {
      let editor: RenameEditor = new RenameEditor()
      editor.init()
      editor.show()

      let cancel: webix.ui.button = webix.$$("cancel") as webix.ui.button
      cancel.attachEvent("onItemClick", () => {
        editor.close()
      })
    })

    let VueOptions: any = {
      series: [
        {
          name: "B+",
          data: [
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
        },
        {
          name: "B-",
          data: [
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
          ],
        },
        {
          name: "Бинрбаум",
          data: [
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
        },
        {
          name: "Вероятность",
          data: [
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
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
        },
      },
      stroke: {
        width: [1, 1, 2, 2],
        curve: "straight",
        dashArray: [2, 2, 4, 0],
      },

      xaxis: {
        type: "numeric",

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
          text: "Уровень подготовленности",
        },
      },
      yaxis: {
        title: {
          text: "частота удачного выполнения задания ",
        },
      },
    }

    var chart = new ApexCharts(document.querySelector("#chart"), VueOptions)
    chart.render()
  }
}
