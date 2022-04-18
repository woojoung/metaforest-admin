
import { ConfigBase } from './ConfigBase'
import { eEnvironment } from '../Enums/Environment'

export class ConfigLocalhost extends ConfigBase {
    constructor() {
        super()

        this.environment = eEnvironment.LOCALHOST
        this.publicPath = '/public/'

        this.locale = 'ko-KR'

        this.apiUrl = 'http://127.0.0.1:7071/'
    }
}

export const cfg = new ConfigLocalhost()
