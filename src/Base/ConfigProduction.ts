
import { eEnvironment } from '../Enums/Environment'
import { ConfigBase } from './ConfigBase'

export class ConfigProduction extends ConfigBase {
    constructor() {
        super()

        this.environment = eEnvironment.PRODUCTION

        this.locale = 'ko-KR'

        this.apiUrl = 'https://api.metaforest.us/'
    }
}

export const cfg = new ConfigProduction()