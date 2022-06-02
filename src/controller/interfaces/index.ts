import { IKata } from '../../domain/interfaces/IKata.interface'
import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from DB || Find user by Id (ObjectId)
    getUsers(page: number, limit: number, id?: string): Promise<any>
    // Get all of the Katas of a spec User
    getKatas(page: number, limit: number, id?: string): Promise<any>
    // Set Katas
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

export interface IKataController {
    // Read all Kata from DB || Find Kata by Id (ObjectId)
    getKatas(page: number, limit: number, id?: string): Promise<any>
    // Get all of the Katas of a spec User

    // Create New Kata
    createKata(kata: IKata): Promise<any>
    // Delete Kata by Id
    deleteKataById(id?: string): Promise<any>
    // Update Kata
    updateKata(id: string, user: IKata): Promise<any>
}
