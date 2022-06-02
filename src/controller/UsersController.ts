import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IUsersController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM
import { deleteUserById, getAllUserKatas, getAllUsers, getUserById, updateUserById } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUsersController {
    /**
     * Endpoint to retreive the Users in the Collection "users" from DB
     * @param page Page where the user is
     * @param limit the limit of the shown items
     * @param id Id of the User
     * @returns All Users o User Found by ID
     */
    @Get('/')
    public async getUsers (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
        LogSuccess('[/api/users] Get all Users Request')
        let res: any = ''
        if (id) {
            LogSuccess(`[/api/users] Get user by Id Request ${id}`)
            res = await getUserById(id)
        } else {
            LogSuccess('[/api/users] Get all users Request')
            res = await getAllUsers(page, limit)
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
            LogWarning('[/api/users] Update user WITHOUT ID')
            res = {
                message: 'Please, provide an Id to update the user from DB'
            }
        }
        return res
    }

    @Get('/katas') // users/katas
    public async getKatas (@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/users/katas] Get User Katas by Id Request ${id}`)
            res = await getAllUserKatas(page, limit, id)
        } else {
            LogSuccess('[/api/users] Get all User Katas Without ID Request')
            res = {
                message: 'ID from user is needed'
            }
        }

        return res
    }
}
