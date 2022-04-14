import { Get, Query, Route, Tags } from 'tsoa'
import { IUsersController } from './interfaces'
import { LogSuccess, LogError } from '../utils/logger'

// ORM
import { getAllUsers, getUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUsersController {
    /**
     * Endpoint to retrieve the Users from the Collection "Users" from DB
     */
    @Get('/')
    public async getUsers (@Query()id?: string): Promise<any> {
        LogSuccess('[/api/users] Get all Users Request')

        let res: any = ''

        if (id) {
            LogSuccess(`[/api/users] Get all users Request ${id}`)

            res = await getUserById(id)
        } else {
            LogSuccess('[/api/users] Get all users Request')
            res = await getAllUsers()
        }

        return res
    }
}
