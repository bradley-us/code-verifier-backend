import { userEntity } from '../entities/User.entity'
import { IUser } from '../interfaces/IUser.interface'
import { LogSuccess, LogError } from '../../utils/logger'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

// Environment Variables
import dotenv from 'dotenv'

// Configuration of environment variables
dotenv.config()

// Obtain Secret Key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

// CRUD

/**
 * Method to obtain all users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async () => {
    try {
        const userModel = userEntity()

        // Search all users
        return await userModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

// Get User by ID
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        const userModel = userEntity()

        // Search user by Id
        return await userModel.findById(id)
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
export const createUser = async (user: any): Promise<any> => {
    try {
        const userModel = userEntity()

        return await userModel.create(user)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`)
    }
}

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
