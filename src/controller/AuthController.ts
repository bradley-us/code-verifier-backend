import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'
import { IUser } from '@/domain/interfaces/IUser.interface'
import { IAuth } from '@/domain/interfaces/IAuth.interface'

import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm'

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
                message: 'Please, provide a User Entity to create one'
            }
        }
        return res
    }

    @Post('/login')
    public async loginUser (auth: IAuth): Promise<any> {
        let res: any = ''
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
                message: 'Please, provide an email && password to login'
            }
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
