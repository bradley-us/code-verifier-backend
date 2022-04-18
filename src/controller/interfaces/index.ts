import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from DB || Find user by Id (ObjectId)
    getUsers(id?: string): Promise<any>
    // Delete user by Id
    deleteUser(id?: string): Promise<any>
    // Create new user
    createUser(user: any): Promise<any>
    // Update user
    updateUser(id: string, user: any): Promise<any>
}
