import { userEntity } from '../entities/User.entity'
import { IUser } from '../interfaces/IUser.interface'
import { LogSuccess, LogError } from '../../utils/logger'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

// Environment Variables
import dotenv from 'dotenv'
import { UserResponse } from '../types/UsersResponse.type'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'
import { response } from 'express'

// Configuration of environment variables
dotenv.config()

// Obtain Secret Key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

// CRUD

/**
 * Method to obtain all users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (page: number, limit: number) => {
    try {
        const userModel = userEntity()

        const response: UserResponse | undefined = {
            users: [],
            totalPages: 1,
            currentPage: page
        }

        // Search all users
        await userModel.find({ isDeleted: false })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('name email age katas')
            .exec().then((users: IUser[]) => {
                // users.forEach((user: IUser) => {
                    // CLEAN PASSWORDS FOR ENDPOINT RESULT
                //     user.password = ''
                // })
                response!.users = users
            })

        // Count total documents in collection "Users"
        await userModel.countDocuments().then((total: number) => {
            response!.totalPages = Math.ceil(total / limit)
            response!.currentPage = page
        })

        return response
        /**
         * {
         *  users: [
         *      {}
         *      ],
         *  totalPages: 2,
         *  currentPage: 1
         * }
         */

        // return await userModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

// Get User by ID
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        const userModel = userEntity()

        // Search user by Id
        return await userModel.findById(id).select('name email age katas')
} catch (error) {
        LogError(`[ORM ERROR]: Getting user by ID: ${error}`)
    }
}

// Delete User By ID
export const deleteUserById = async (id: string): Promise<any | undefined> => {
    try {
        const userModel = userEntity()

        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`)
    }
}

// Create New User
// export const createUser = async (user: any): Promise<any> => {
//     try {
//         const userModel = userEntity()

//         return await userModel.create(user)
//     } catch (error) {
//         LogError(`[ORM ERROR]: Creating user: ${error}`)
//     }
// }

// Update User by ID
export const updateUserById = async (id: string, user: any): Promise<any> => {
    try {
        const userModel = userEntity()

        // Update user
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating user by Id ${id}: ${error}`)
    }
}

// Register User
export const registerUser = async (user: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity()

        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`)
    }
}

// Login User
export const loginUser = async (auth: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity()

        let userFound: IUser | undefined
        let token = undefined || ''

        // Check if User exists by Unique Email
        await userModel.findOne({ email: auth.email }).then((user: IUser) => {
            userFound = user
        }).catch((error) => {
            console.log('[ERROR Authentication in ORM]: Usert Not Found')
            throw new Error(`[ERROR Authentication in ORM]: Usert Not Found: ${error}`)
        })

        const validPassword = bcrypt.compareSync(auth.password, userFound!.password)

        // Check if Password is VALID (compare with bcrypt)
        if (!validPassword) {
            console.log('[ERROR Authentication in ORM]: Password Not Valid')
            throw new Error('[ERROR Authentication in ORM]: Password Not Valid')
        }

        // Generate our JWT
        token = jwt.sign({ email: userFound!.email }, secret, {
            expiresIn: '2h'
        })

        return {
            user: userFound,
            token: token
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`)
    }
}

// Login User
export const logoutUser = async (auth: any): Promise<any | undefined> => {
    // TODO: NOT IMPLEMENTED
    return null
}

/**
 * Method to obtain all users from Collection "Users" in Mongo Server
 */
 export const getAllUserKatas = async (page: number, limit: number, id: string) => {
    try {
        const userModel = userEntity()
        const kataModel = kataEntity()

        let katasFound: IKata[] = []

        const response: any = {
            katas: []
        }

        await userModel.findById(id).then(async (user: IUser) => {
            response.user = user.name
            response.user = user.email

            // Create types to search
            const objectIds: mongoose.Types.ObjectId[] = []
            user.katas.forEach((kataID: string) => {
                const objectID = new mongoose.Types.ObjectId(kataID)
                objectIds.push(objectID)
            })

            await kataModel.find({ _id: { $in: objectIds } }).then((katas: IKata[]) => {
                katasFound = katas
            })
        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`)
        })

        response.katas = katasFound

        return response
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}
