import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogError, LogWarning } from '../utils/logger'

// ORM - Katas Collection
import { createKata, deleteKataById, getAllKatas, getKataById, updateKataById } from '../domain/orm/Kata.orm'
import { IKata } from '@/domain/interfaces/IKata.interface'

@Route('/api/katas')
@Tags('KatasController')
export class KatasController implements IKataController {
    /**
     * Endpoint to retreive the Katas in the Collection "katas" from DB
     * @param page Page where the kata is
     * @param limit the limit of the shown katas
     * @param id Id of the User
     * @returns All Katas o Kata Found by ID
     */
    @Get('/')
    public async getKatas (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/katas] Get Kata by Id Request ${id}`)
            res = await getKataById(id)
        } else {
            LogSuccess('[/api/katas] Get all Katas Request')
            res = await getAllKatas(page, limit)
        }

        return res
    }

    @Post('/')
    public async createKata (kata: IKata): Promise<any> {
        let res: any = ''

        if (kata) {
            LogSuccess(`[/api/katas] Register New Kata: ${kata.name} `)
            await createKata(kata).then((r) => {
                LogSuccess(`[/api/katas] Created Kata: ${kata.name} `)
                res = {
                    message: `Kata created successfully: ${kata.name}`
                }
            })
        } else {
            LogWarning('[/api/katas]: Register needs Kata Entity')
            res = {
                message: 'Kata no signed up: Please, provide a Kata Entity to create one'
            }
        }
        return res
    }

    /**
     * Endpoint to delete the Katas in the Collection "katas" from DB
     * @param { string } id Id of the Kata to be deleted (Optional)
     * @returns message that informs if deletion was success
     */
    @Delete('/')
    public async deleteKataById (@Query()id?: string): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/katas] Get KAta by Id Request ${id}`)
            await deleteKataById(id).then((r: any) => {
                res = {
                    message: `Kata with Id: ${id} was deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/katas] Delete Kata by Id Request')
            res = {
                message: 'Please, provide an Id to remove from DB'
            }
        }
        return res
    }

    @Put('/')
    public async updateKata (@Query()id: string, kata: IKata): Promise<any> {
        let res: any = ''

        if (id) {
            LogSuccess(`[/api/katas] Update Kata by Id ${id}`)
            await updateKataById(id, kata).then((r: any) => {
                res = {
                    message: `Kata with Id: ${id} was updated successfully`
                }
            })
        } else {
            LogWarning('[/api/katas] Update Kata WITHOUT ID')
            res = {
                message: 'Please, provide an Id to update from DB'
            }
        }
        return res
    }
}
