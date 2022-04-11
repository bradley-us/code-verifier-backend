import { userEntity } from '../entities/User.entity'

import { LogSuccess, LogError } from '@/utils/logger'
import mongoose from 'mongoose'

// CRUD

/**
 * Method to obtain all users from Collection "Users" in Mongo Server
 */
export const GetAllUsers = async () => {
    try {
        const userModel = userEntity()

        // Search all users
        return await userModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

// TODO:
// Get User by ID
// Get User by Email
// Delete User by Email
// Create New User
// Update User by ID
