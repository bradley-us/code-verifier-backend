import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

import bodyParser from 'body-parser'

// Router from express
const usersRouter = express.Router()

const jsonParser = bodyParser.json()

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
        return res.status(200).send(response)
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
    // // POST:
    // .post(jsonParser, async (req: Request, res: Response) => {
    //     const name: any = req?.query?.name
    //     const email: any = req?.query?.email
    //     const age: any = req?.query?.age

    //     // Controller Instance to execute method
    //     const controller: UserController = new UserController()

    //     const userNewToPost: any = {
    //         name,
    //         email,
    //         age
    //     }
    //     // Obtain Response
    //     const response: any = await controller.createUser(userNewToPost)

    //     // Send to the client the response
    //     return res.status(201).send(response)
    // })
    // PUT:
    .put(async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        const name: any = req?.query?.name
        const email: any = req?.query?.email
        const age: any = req?.query?.age

        // Controller Instance to execute method
        const controller: UserController = new UserController()

        const updateUserData: any = {
            name,
            email,
            age
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, updateUserData)
        // Send to the client the response
        return res.status(200).send(response)
    })

// usersRouter.route('/:user_id')
//     .get()

/**
 * GET Documents => 200 OK
 * CREATE Documents => 201 OK
 * DELETE Documents => 200 (Entity) / 204 (No return)
 * UPDATE Documents => 200 (Entity) / 204 (No return)
 */

// Export Hello Router
export default usersRouter
