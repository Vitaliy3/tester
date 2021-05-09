import { data } from "models/records"
import { JetView } from "webix-jet"

export default class MyDataView extends JetView {
  config() {
    return {
      view: "window",
      id: "win",
      position: "center",
      head: "none",
      modal: true,
      width: 500,
    }
  }
  init(view) {}
}
