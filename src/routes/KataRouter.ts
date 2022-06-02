import express, { Request, Response } from 'express'
import { KatasController } from '../controller/KatasController'
import { LogInfo } from '../utils/logger'

import bodyParser from 'body-parser'
import { verifyToken } from '../middlewares/verifyToken.middleware'
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface'

// Router from express
const katasRouter = express.Router()

const jsonParser = bodyParser.json()

// GET => http://localhost:8000/api/katas/?id=6255891ffdca980f16c851ad
katasRouter.route('/')
    // GET:
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)

        // Pagination
        const page: any = req?.query?.page || 1
        const limit: any = req?.query?.limit || 10

        // Controller Instance to execute method
        const controller: KatasController = new KatasController()

        // Obtain Response
        const response: any = await controller.getKatas(page, limit, id)

        // Send to the client the response
        return res.status(200).send(response)
    })
    // DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute method
        const controller: KatasController = new KatasController()
        // Obtain Response
        const response: any = await controller.deleteKataById(id)

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
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Obtain a Query Param (Id)
        const id: any = req?.query?.id

        // Read from body
        const name: string = req?.body?.name
        const description: string = req?.body?.description || ''
        const level: KataLevel = req?.body?.level || KataLevel.BASIC
        const attempts: number = req?.body?.attempts || 0
        const stars: number = req?.body?.stars || 0
        const creator: string = req?.body?.creator
        const solution: string = req?.body?.solution || ''
        const participants: string[] = req?.body?.participants || []

        if (name && description && level && attempts && stars && creator && solution && participants) {
            // Controller Instance to execute method
            const controller: KatasController = new KatasController()

            const kata: IKata = {
                name,
                description,
                level,
                attempts,
                stars,
                creator,
                solution,
                participants
            }

            // Obtain Response
            const response: any = await controller.updateKata(id, kata)

            // Send to the client the response
            return res.status(200).send(response)
        } else {
            return res.status(400).send({
                message: '[ERROR]: Updating Kata. You need to send all attributes'
            })
        }
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Read from body
        const name: string = req?.body?.name
        const description: string = req?.body?.description || ''
        const level: KataLevel = req?.body?.level || KataLevel.BASIC
        const attempts: number = req?.body?.attempts || 0
        const stars: number = req?.body?.stars || 0
        const creator: string = req?.body?.creator
        const solution: string = req?.body?.solution || ''
        const participants: string[] = req?.body?.participants || []

        if (name && description && level && attempts >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
            // Controller Instance to execute method
            const controller: KatasController = new KatasController()

            const kata: IKata = {
                name,
                description,
                level,
                attempts,
                stars,
                creator,
                solution,
                participants
            }

            // Obtain Response
            const response: any = await controller.createKata(kata)

            // Send to the client the response
            return res.status(201).send(response)
        } else {
            return res.status(400).send({
                message: '[ERROR]: Updating Kata. You need to send all attributes'
            })
        }
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
export default katasRouter
