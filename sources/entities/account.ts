export class Account {
  private id: number
  private login: string
  private password: string
  private token: string
  private email: string
  private telephone: string
  private status: AccountStatus

  constructor() {}

  private get(id: number): Promise<Account> {
    return new Promise(() => {})
  }
  private getAll(): Promise<Account[]> {
    return new Promise(() => {})
  }
  private resetPassword(oldPass: string, newPass: string): Promise<boolean> {
    return new Promise(() => {})
  }
  private auth(account: Account): Promise<boolean> {
    return new Promise(() => {})
  }
  private deAuth(account: Account): Promise<boolean> {
    return new Promise(() => {})
  }
  private edit(account: Account): Promise<Account> {
    return new Promise(() => {})
  }
  private block(id: number): Promise<boolean> {
    return new Promise(() => {})
  }
  private unblock(id: number): Promise<boolean> {
    return new Promise(() => {})
  }
}

export enum AccountStatus {
  active = "active",
  blocked = "blocked",
}
export class Contact {
  private id: number
  private telephone: string
  private email: string
  private address: string

  constructor() {}

  private get(): Promise<Contact> {
    return new Promise(() => {})
  }
}
