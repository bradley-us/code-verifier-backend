import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'
import { LogSuccess, LogError } from '../../utils/logger'

// Environment Variables
import dotenv from 'dotenv'

// Configuration of environment variables
dotenv.config()

// CRUD

/**
 * Method to obtain all of the katas from Collection "" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number) => {
    try {
        const kataModel = kataEntity()

        const response: any = {}

        // Search all users
        await kataModel.find({ isDeleted: false })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                // users.forEach((user: IUser) => {
                    // CLEAN PASSWORDS FOR ENDPOINT RESULT
                //     user.password = ''
                // })
                response!.katas = katas
            })

        // Count total documents in collection "Users"
        await kataModel.countDocuments().then((total: number) => {
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
        LogError(`[ORM ERROR]: Getting All Katas: ${error}`)
    }
}

// Get Kata by ID
export const getKataById = async (id: string): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()

        // Search user by Id
        return await kataModel.findById(id)
} catch (error) {
        LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`)
    }
}

// Delete Kata By ID
export const deleteKataById = async (id: string): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()

        return await kataModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata by ID: ${error}`)
    }
}

// Create New User
export const createKata = async (kata: any): Promise<any> => {
    try {
        const kataModel = kataEntity()

        return await kataModel.create(kata)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`)
    }
}

// Update User by ID
export const updateKataById = async (id: string, kata: IKata): Promise<any> => {
    try {
        const kataModel = kataEntity()

        // Update Kata
        return await kataModel.findByIdAndUpdate(id, kata)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata by Id ${id}: ${error}`)
    }
}
