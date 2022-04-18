import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/**
 * @param { Request } req Original Request previous middleware of verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Check HEADER from Request for 'x-access-token'
    const token: any = req.headers['x-access-token']

    // Verify if jwt is taken
    if (!token) {
        return res.status(403).send({
            authentication: 'failed',
            message: 'Not authorized to consume this endpoint'
        })
    }

    // Verify the token obtained
    jwt.verify(token, '', (err: any, decoded: any) => {
        if (err) {
            return res.status(500).send(
                {
                    authenticationError: 'JWT verification failed',
                    message: 'Failed to verify the JWT token in Request'
                }
            )
        }

        // Gives something to next Request (user Id || other info)

        // Execute Next Function => Protected Routes will be executed
        next()
    })
}
