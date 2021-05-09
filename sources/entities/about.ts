export class About {
  private id: number
  private mainImage: string
  private mainText: string

  constructor() {}

  private get(): Promise<About> {
    return new Promise(() => {})
  }
}
