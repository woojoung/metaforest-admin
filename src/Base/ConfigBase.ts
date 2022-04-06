
import { eEnvironment } from '../Enums/Environment'

export class ConfigBase {
    environment: eEnvironment
    publicPath: string

    locale: string

    apiUrl: string

    storageExpiryTimeKey: string
    storageTimeoutMinutes: number
    
    constructor() {
        this.environment = eEnvironment.NONE
        this.publicPath = ''

        this.locale = 'ko-KR'

        this.apiUrl = ''

        this.storageExpiryTimeKey = '_expiryTime'
        this.storageTimeoutMinutes = 1 * 24 * 60
    }
}
