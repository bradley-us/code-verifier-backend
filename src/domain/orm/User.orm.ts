import { userEntity } from '../entities/User.entity'

import { LogSuccess, LogError } from '../../utils/logger'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/IUser.interface'

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

        // Find User by email
        userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
            if (err) {
                // TODO: Return an error > ERROR while searching (500)

            }

            if (!user) {
                // TODO: Return an error > ERROR USER NOT FOUND (404)
            }

            const validPassword = bcrypt.compareSync(auth.password, user.password)

            if (!validPassword) {
                // TODO > NOT AUTHORIZED (401)
            }

            // Create JWT
            // TODO: Secret must be in .env
            const token = jwt.sign({ email: user.email }, 'MYSECRETWORD', {
                expiresIn: '2h'
            })

            return token
        })
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`)
    }
}

// Login User
export const logoutUser = async (auth: any): Promise<any | undefined> => {
    // TODO: NOT IMPLEMENTED
    return null
}
