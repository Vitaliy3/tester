import * as webix from "webix"

export default class RenameEditor {
  private view: any
  private config(): any {
    return {
      view: "window",
      id: "renameWindow",
      position: "center",
      head: "Переименование файла",
      modal: true,
      width: 500,
      body: {
        rows: [
          {
            view: "form",
            id: "renameForm",
            elements: [
              {
                rows: [
                  {
                    id: "name",
                    name: "title",
                    view: "text",
                    inputHeight: 30,
                    label: "Название",
                    labelWidth: 105,
                    tooltip: "Название",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            cols: [
              {
                view: "button",
                id: "confirm",
                label: "",
                type: "form",
              },
              {
                view: "button",
                id: "cancel",
                label: "Отмена",
                type: "danger",
              },
            ],
          },
        ],
      },
    }
  }
  public init(): void {
    this.view = webix.ui(this.config())
  }
  public show(): void {
    this.view.show()
  }
  public close(): void {
    this.view.destructor()
  }
}
