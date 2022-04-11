import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'
import { Get, Query, Route, Tags } from 'tsoa'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
    /**
     * Endpoint to retrieve a Message "Hello {name}" in JSON
     * @param { string | undefined } name Name of user to be greeted
     * @returns { BasicResponse } Promise of BasicResponse
     */
    public async getMessage (name?: string): Promise<BasicResponse> {
        LogSuccess('[api/hello] Get Request')
        return {
            message: `Hello, ${name || 'world!'}`
        }
    }
}
