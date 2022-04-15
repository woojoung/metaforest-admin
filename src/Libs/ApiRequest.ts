
import { Any, integer } from '../Base/Type'
import { eApiMessageType } from '../Enums/ApiMessageType'

export class ApiRequest {
    msgType: eApiMessageType
    data: Any
    email: string
    password: string

    constructor( msgType = 0, data: Any = null, email: string = '', password: string = '') {
        this.msgType = msgType
        this.data = data
        this.email = email
        this.password = password
    }

    getBoolean(name: string, defaultValue = false): boolean {
        if (this.data === null || (name in this.data) === false) {
            return defaultValue
        }

        const value = this.data[name]
        if (value === null) {
            return defaultValue
        }

        return typeof value === 'boolean' ? value : value.toString() === 'true'
    }

    getInteger(name: string, defaultValue = 0): number {
        if (this.data === null || (name in this.data) === false) {
            return defaultValue
        }

        let value = this.data[name]
        if (value === null) {
            return defaultValue
        }

        if (typeof value !== 'string') {
            value = value.toString()
        }

        if (value === '') {
            return defaultValue
        }

        return integer(value)
    }

    getString(name: string, defaultValue = ''): string {
        if (this.data === null || (name in this.data) === false) {
            return defaultValue
        }

        const value = this.data[name]
        if (value === null || value === '') {
            return defaultValue
        }

        return typeof value === 'string' ? value : value.toString()
    }
}
