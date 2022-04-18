import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// GET => http://localhost:8000/api/users/?id=6255891ffdca980f16c851ad
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController()
        // Obtain Response
        const response: any = await controller.getUsers(id)

        // Send to the client the response
        return res.send(response)
    })
    // DELETE:
    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController()
        // Obtain Response
        const response: any = await controller.deleteUser(id)

        // Send to the client the response
        return res.send(response)
    })
    // POST:
    .post(async (req: Request, res: Response) => {
        const name: any = req?.query?.name
        const email: any = req?.query?.email
        const age: any = req?.query?.age

        // Controller Instance to execute method
        const controller: UserController = new UserController()

        const userNewToPost: any = {
            name,
            email,
            age
        }
        // Obtain Response
        const response: any = await controller.createUser(userNewToPost)

        // Send to the client the response
        return res.send(response)
    })
    // PUT:
    .put(async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController()
        const updateUserData: any = {
            name: 'Brusk',
            email: 'mil@mil.com',
            age: 20
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, updateUserData)
        // Send to the client the response
        return res.send(response)
    })

// usersRouter.route('/:user_id')
//     .get()

// Export Hello Router
export default usersRouter
