import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUsersController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUsersController {
    /**
     * Endpoint to retrieve the Users from the Collection "Users" or "User by Id" from DB
     */
    @Get('/')
    public async getUsers (@Query()id?: string): Promise<any> {
        LogSuccess('[/api/users] Get all Users Request')
        let res: any = ''
        if (id) {
            LogSuccess(`[/api/users] Get user by Id Request ${id}`)
            res = await getUserById(id)
        } else {
            LogSuccess('[/api/users] Get all users Request')
            res = await getAllUsers()
        }
        return res
    }

    /**
     * Endpoint to delete the Users in the Collection "Users" from DB
     * @param { string } id of the user to delete (Optional)
     * @returns message to inform if deletion was correct
     */
    @Delete('/')
    public async deleteUser (@Query()id?: string): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/users] Get user by Id Request ${id}`)
            await deleteUserById(id).then((r: any) => {
                res = {
                    message: `User with Id: ${id} was deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete user by Id Request')
            res = {
                message: 'Please, provide an Id to remove the user from DB'
            }
        }
        return res
    }

    @Post('/')
    public async createUser (user: any): Promise<any> {
        let res: any = ''

        await createUser(user).then((r) => {
            LogSuccess(`[/api/users] User created ${user.name}`)
            res = {
                message: `User created successfully ${user.name}`
            }
        })
    }

    @Put('/')
    public async updateUser (@Query()id: string, user: any): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/users] Update user by Id ${id}`)
            await updateUserById(id, user).then((r: any) => {
                res = {
                    message: `User with Id: ${id} was updated successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Update user by Id Request')
            res = {
                message: 'Please, provide an Id to update the user from DB'
            }
        }
        return res
    }
}
