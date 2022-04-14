import express, { Express, Request, Response } from 'express'

// Swagger
import SwaggerUi from 'swagger-ui-express'

// Security
import cors from 'cors'
import helmet from 'helmet'

// TODO: HTTPS
import rootRouter from '../routes'
import mongoose from 'mongoose'

// * CREATE EXPRESS APP
const server: Express = express()

// * Swagger Config and route
server.use(
    '/docs',
    SwaggerUi.serve,
    SwaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
            explorer: true
        }
    })
)

// * Define SERVER to use '/api' and use rootRouter from index.ts in routes DIR
// From this point onover: http://localhost:8000/api/...
server.use('/api', rootRouter)

// * Static server
server.use(express.static('public'))

// TODO: Mongoose Connection
mongoose.connect('mongodb://localhost:27017/codeverification')

// * Security config
server.use(helmet())
server.use(cors())

// * Content Type Config:
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// * Redirections config
// http://localhost:8000/ => http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server
