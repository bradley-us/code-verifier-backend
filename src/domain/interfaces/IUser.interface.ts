import { IKata } from './IKata.interface'

export interface IUser {
    name: string,
    email: string,
    age: number,
    password: string,
    katas: string[]
}
