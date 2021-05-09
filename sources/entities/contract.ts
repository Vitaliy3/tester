export class Contract {
  private id!: number
  private name: string
  private dateOfConclusion: Date
  private startDate: Date
  private endDate: Date
  private conditions: string[]
  private payStatus: PayStatus
  private executionStatus: ExecutionStatus
  private features: Feature[]

  constructor() {}

  private getAll(): Promise<Contract[]> {
    return new Promise(() => {})
  }
  private edit(contract: Contract): Promise<Contract> {
    return new Promise(() => {})
  }
  private add(contract: Contract): Promise<Contract> {
    0
    return new Promise(() => {})
  }
  private terminate(id: number): Promise<boolean> {
    return new Promise(() => {})
  }
}

class Feature {
  private id: number
  private featureDescription: string
}

enum PayStatus {
  paid = "paid",
  notPaid = "notPaid",
}

enum ExecutionStatus {
  completed = "completed",
  notCompleted = "notCompleted",
  compliting = "compliting",
}
