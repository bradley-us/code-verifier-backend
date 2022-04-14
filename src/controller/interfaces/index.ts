import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from DB
    getUsers(): Promise<any>
}
