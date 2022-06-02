import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { AuthResponse, ErrorResponse } from '../controller/types/index'

import { registerUser, loginUser, logoutUser, getUserById } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser (user: IUser): Promise<any> {
        let res: any = ''

        if (user) {
            LogSuccess(`[/api/auth/register] Register New User: ${user.email} `)
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Created User: ${user.email} `)
                res = {
                    message: `User created successfully: ${user.name}`
                }
            })
        } else {
            LogWarning('[/api/users]Register needs User Entity')
            res = {
                message: 'User no signed up: Please, provide a User Entity to create one'
            }
        }
        return res
    }

    @Post('/login')
    public async loginUser (auth: IAuth): Promise<any> {
        let res: AuthResponse | ErrorResponse | undefined

        if (auth) {
            LogSuccess(`[/api/auth/login] Login User: ${auth.email} `)
            const data = await loginUser(auth)
            res = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        } else {
            LogWarning('[/api/login]Register needs Auth Entity (email && password')
            res = {
                error: '[AUTH ERROR]: Email & Password needed',
                message: 'TOKEN NOT VALID'
            }
        }
        return res
    }

    /**
     * Endpoint to retrieve the Users from the Collection "Users" or "User by Id" from DB
     * Middleware: Validate JWT
     * In Headers you must add the x-access-token with a valid JWT
     */
     @Get('/me')
     public async userData (@Query()id: string): Promise<any> {
         let res: any = ''
         if (id) {
             LogSuccess(`[/api/users] Get user by Id Request ${id}`)
             res = await getUserById(id)
         }
         return res
     }

    @Post('/logout')
    public async logoutUser (auth: IAuth): Promise<any> {
        let res: any = ''
        // TODO: Authenticate user and return a JWT
        res = 'j'
        return res
    }
}
