export class Comment {
  //private baseModel
  private id: number
  private user: Account
  private message: string
  private date: Date

  constructor() {}

  private getAll(): Promise<Comment[]> {
    return new Promise(() => {})
  }
  private edit(comment: Comment): Promise<Comment> {
    return new Promise(() => {})
  }
  private delete(id: number): Promise<boolean> {
    return new Promise(() => {})
  }
  private add(comment: Comment): Promise<Comment> {
    return new Promise(() => {})
  }
}
