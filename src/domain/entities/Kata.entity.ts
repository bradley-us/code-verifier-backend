import mongoose from 'mongoose'
import { IKata } from '../interfaces/IKata.interface'

export const kataEntity = () => {
    const kataSchema = new mongoose.Schema<IKata>(
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: String, required: true },
            attempts: { type: Number, required: true },
            stars: { type: Number, required: true },
            creator: { type: String, required: true }, // User ID
            solution: { type: String, required: true },
            participants: { type: [], required: true }
        }
    )

    return mongoose.models.katas || mongoose.model<IKata>('katas', kataSchema)
}
