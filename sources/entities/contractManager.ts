import { Contract } from "./contract"

export class ContractManager {
  private id: number
  private user: Account
  private contract: Contract

  constructor() {}

  private confirmPayment(userId: number): Promise<boolean> {
    return new Promise(() => {})
  }
  private rejectPayment(userId: number): Promise<boolean> {
    return new Promise(() => {})
  }
}
