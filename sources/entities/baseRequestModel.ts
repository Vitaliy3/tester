import axios, { AxiosResponse } from "axios"

export default class BaseRequestModel {
  //todo token
  protected get(url: string): Promise<any> {
    return this.parse(axios.get(url))
  }

  protected post(url: string, data: any): Promise<any> {
    return this.parse(axios.post(url, data))
  }

  protected put(url: string, data: any): Promise<any> {
    return this.parse(axios.put(url, data))
  }

  protected delete(url: string): Promise<any> {
    return this.parse(axios.delete(url))
  }

  private parse(promise: Promise<AxiosResponse<any>>): Promise<any> {
    return promise
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        alert(err)
      })
  }
}
