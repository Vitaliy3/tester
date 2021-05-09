export class ReportManager {
  private id: number
  private name: string
  private dateStartAnalyse: Date
  private dateEndAnalyse: Date

  constructor() {}

  private upload(file: File): Promise<boolean> {
    return new Promise(() => {})
  }
  private download(file: File): Promise<boolean> {
    return new Promise(() => {})
  }
  private remove(id: number): Promise<boolean> {
    return new Promise(() => {})
  }
  private rename(newName: string): Promise<ReportManager> {
    return new Promise(() => {})
  }
}
