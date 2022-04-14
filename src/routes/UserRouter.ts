import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// GET => http://localhost:8000/api/users/?id=6255891ffdca980f16c851ad
usersRouter.route('/')
    // GET:
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController()
        // Obtain Response
        const response: any = await controller.getUsers(id)

        // Send to the client the response
        return res.send(response)
    })

// Export Hello Router
export default usersRouter
