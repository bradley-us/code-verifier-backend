import { userEntity } from '../entities/User.entity'

import { LogSuccess, LogError } from '../../utils/logger'
import mongoose from 'mongoose'

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

// TODO:
// Get User by Email
// Delete User by Email
// Create New User
// Update User by ID
