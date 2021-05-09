export class Analyse {
  private id: number
  private name: string
  private status: string
  private loadDate: Date
  private tasks: Task[]
  private countUsers: number
  private countTasks: number

  constructor(
    id: number,
    name: string,
    status: string,
    loadDate: Date,
    users: number,
    task: number
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.loadDate = loadDate
    this.countTasks = task
    this.countUsers = users
  }

  public getAllBanks(): Promise<Analyse[]> {
    return new Promise((res) => {
      const analyse: Analyse = new Analyse(
        1,
        "Тест по истории",
        "Успех",
        new Date(),
        5,
        4
      )
      const analyse1: Analyse = new Analyse(
        2,
        "Тест по математике",
        "Успех",
        new Date(),
        41,
        36
      )
      res([analyse, analyse1])
    })
  }
  // private sendByEmail(bankId: number, email: string): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private upload(file: File): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private downloadAnalysed(bankId: number): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private downloadRaw(bankId: number): Promise<boolean> {
  //   return new Promise(() => {})
  // }
  // private rename(bankId: number, newName: string): Promise<Analyse> {
  //   return new Promise(() => {})
  // }
}

export class Task {
  private id: number
  private levelOfPreparadness: number[]
  private executionFrequency: number[]
  private birnbaumPlus: number[]
  private birnbaumMinus: number[]

  constructor(
    id: number,
    levelOfPreparadness: number[],
    executionFrequency: number[],
    birnbaumPlus: number[],
    birnbaumMinus: number[]
  ) {
    this.id = id
    this.levelOfPreparadness = levelOfPreparadness
    this.executionFrequency = executionFrequency
    this.birnbaumPlus = birnbaumPlus
    this.birnbaumMinus = birnbaumMinus
  }

  public getTasksByBankId(id: number): Promise<Task[]> {
    return new Promise((res) => {
      const tasks: Task[] = []
      if (id === 1) {
        tasks.push(new Task(9944482, [1], [1], [1], [1]))
        tasks.push(new Task(2324213, [2], [1], [1], [1]))
        tasks.push(new Task(3421342, [3], [1], [1], [1]))
      } else if (id === 2) {
        tasks.push(new Task(22, [1], [1], [1], [1]))
        tasks.push(new Task(22, [2], [1], [1], [1]))
      }

      res(tasks)
    })
  }
  // private analyseTask(bankId: number, taskId: number): Promise<Task[]> {
  //   return new Promise(() => {})
  // }
}
