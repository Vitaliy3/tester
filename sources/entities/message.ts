import BaseRequestModel from "./baseRequestModel"

export class Message {
  private id: number
  private text: string
  private sender: Account
  private recipient: Account
  private dispatchTime: Date

  constructor() {}

  private getByDate(startDate: Date, endDate: Date): Promise<Message[]> {
    return new Promise(() => {})
  }
  private send(message: Message) {
    return new Promise(() => {})
  }
}
