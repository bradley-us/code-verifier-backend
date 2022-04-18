/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'
import authRouter from './AuthRouter'
import helloRouter from './HelloRouter'
import usersRouter from './UserRouter'

// Server instance
const server = express()

// Router instance
const rootRouter = express.Router()

// Activate for requests to http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    // Send Hello World
    res.send('Welcome to App express + Nodemon + JEST + TS + Swagger + Mongoose')
})

// Redirections to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello => HelloRouter
server.use('/users', usersRouter) // http://localhost:8000/api/users => UserRouter
// Auth routes
server.use('/auth', authRouter)
// Add more routes to our App

export default server
