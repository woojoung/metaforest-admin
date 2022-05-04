
import { eEnvironment } from '../Enums/Environment'
import { ConfigBase } from './ConfigBase'

export class ConfigProduction extends ConfigBase {
    constructor() {
        super()

        this.environment = eEnvironment.PRODUCTION

        this.locale = 'ko-KR'

        this.apiUrl = 'https://ec2-api.metaforest.us:7071/'
    }
}

export const cfg = new ConfigProduction()