
import { eEnvironment } from '../Enums/Environment'
import { ConfigBase } from './ConfigBase'

export class ConfigProduction extends ConfigBase {
    constructor() {
        super()

        this.environment = eEnvironment.PRODUCTION

        this.locale = 'ko-KR'

        this.apiUrl = 'http://ec2-13-209-96-172.ap-northeast-2.compute.amazonaws.com:7071/'
    }
}

export const cfg = new ConfigProduction()