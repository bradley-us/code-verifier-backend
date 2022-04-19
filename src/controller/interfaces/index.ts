import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from DB || Find user by Id (ObjectId)
    getUsers(id?: string): Promise<any>
    // Delete user by Id
    deleteUser(id?: string): Promise<any>
    // Update user
    updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
    // Register users
    registerUser(user: IUser): Promise<any>
    // Login uuser
    loginUser(auth: any): Promise<any>
}
