import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { LogInfo } from '../utils/logger'

// BCRYPT for passwords
import bcrypt from 'bcrypt'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// Router from express
const authRouter = express.Router()

authRouter.route('/auth/register')
    .post(async (req: Request, res: Response) => {
        const { name, password, email, age } = req.body
        let hashedPassword = ''

        if (name && password && email && age) {
            // Obtain the password in Request and cypher it!!
            hashedPassword = bcrypt.hashSync(req.body.password, 8)

            const newUser: IUser = {
                name,
                email,
                password,
                age
            }

            // Controller Instance to execute method
            const controller: AuthController = new AuthController()
            // Obtain Response
            const response: any = await controller.registerUser(newUser)
            // Send to the client the response
            return res.status(200).send(response)
        }
        return null
    })

authRouter.route('/auth/login')
    .post(async (req: Request, res: Response) => {
        const { email, password } = req.body

        if (email && password) {
            const auth: IAuth = {
                email,
                password
            }

            // Controller Instance to execute method
            const controller: AuthController = new AuthController()
            // Obtain Response
            const response: any = await controller.loginUser({ email, password })
            // Send to the client the response which includes the JWT to authorize Requests
            return res.status(200).send(response)
        }
        return null
    })

export default authRouter
