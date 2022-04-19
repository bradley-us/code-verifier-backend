import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { LogInfo } from '../utils/logger'

// Interfaces
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// MiddleWare (Se ejecuta antes de la ejecución de otros programas o cuerpos)
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser (Read JSON from Body in Requests)
import bodyParser from 'body-parser'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// Middleware to read JSON's
const jsonParser = bodyParser.json()

// Router from express
const authRouter = express.Router()

authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        const { name, password, email, age } = req?.body
        let hashedPassword = ''

        if (name && password && email && age) {
            // Obtain the password in Request and cypher it!!
            hashedPassword = bcrypt.hashSync(password, 8)

            const newUser: IUser = {
                name,
                email,
                password: hashedPassword,
                age
            }

            // Controller Instance to execute method
            const controller: AuthController = new AuthController()
            // Obtain Response
            const response: any = await controller.registerUser(newUser)
            // Send to the client the response
            return res.status(200).send(response)
        } else {
            return res.status(400).send({
                message: '[ERROR User Data missing]: No user can be registered'
            })
        }
    })

authRouter.route('/login')
    .post(jsonParser, async (req: Request, res: Response) => {
        const { email, password } = req?.body

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
        } else {
            return res.status(400).send({
                message: '[ERROR User Data missing]: No user can be logged'
            })
        }
    })

// Route Protected by VERIFY TOKEN MIDDLEWARE
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain the ID of the user to check it's data
        const id: any = req?.query?.id

        if (id) {
            // Controller: Auth Controller
            const controller: AuthController = new AuthController()

            // Obtain Response from Controller
            const response: any = await controller.userData(id)

            // If user is authorized
            return res.status(200).send(response)
        } else {
             return res.status(401).send({
                 message: 'You are not authorized to visit this section'
             })
         }
    })

export default authRouter
