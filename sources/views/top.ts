import { JetView, plugins } from "webix-jet"
import * as webix from "webix"

export default class TopView extends JetView {
  private toolbar: {
    main: webix.ui.button
    contract: webix.ui.button
    analyse: webix.ui.button
    support: webix.ui.button
    contacts: webix.ui.button
    aboutCompany: webix.ui.button
    aboutMethod: webix.ui.button
    account: webix.ui.button
  }

  config() {
    var menu = {
      view: "toolbar",
      id: "top:menu",
      cols: [
        {
          localId: "main",
          view: "button",
          value: "Главная",
          align: "left",
        },
        {
          localId: "contract",
          view: "button",
          value: "Заключение договора",
          align: "left",
        },
        {
          localId: "analyse",
          view: "button",
          value: "Анализ",
          align: "left",
        },
        {
          localId: "support",
          view: "button",
          value: "Тех. поддержка",
          align: "left",
        },
        {
          localId: "contacts",
          view: "button",
          value: "Контакты",
          align: "left",
        },
        {
          localId: "aboutCompany",
          view: "button",
          value: "О компании",
          align: "left",
        },
        {
          localId: "aboutMethod",
          view: "button",
          value: "О методологии",
          align: "left",
        },
        {
          localId: "account",
          view: "button",
          value: "Аккаунт",
          align: "left",
        },
      ],
    }

    var ui = {
      type: "clean",
      paddingX: 5,
      css: "app_layout",
      cols: [
        {
          paddingX: 5,
          paddingY: 10,
          rows: [
            menu,
            {
              type: "wide",
              paddingY: 10,
              paddingX: 5,
              rows: [{ $subview: true }],
            },
          ],
        },
      ],
    }

    return ui
  }
  init() {
    this.toolbar = {
      main: this.$$("main") as webix.ui.button,
      contract: this.$$("contrat") as webix.ui.button,
      analyse: this.$$("analyse") as webix.ui.button,
      support: this.$$("support") as webix.ui.button,
      contacts: this.$$("contacts") as webix.ui.button,
      aboutCompany: this.$$("aboutCompany") as webix.ui.button,
      aboutMethod: this.$$("aboutMethod") as webix.ui.button,
      account: this.$$("account") as webix.ui.button,
    }
    ;(this.$$("main") as webix.ui.button).attachEvent("onItemClick", () => {
      this.show("/top/mainPage")
    })
    ;(this.$$("analyse") as webix.ui.button).attachEvent("onItemClick", () => {
      this.show("../top/analyse")
    })
    this.use(plugins.Menu, "top:menu")
  }
}
