
import { cfg } from '../Base/Config'

class Storage {
    _setExpiryTime(): void {
        const expiryTime = (new Date()).getTime() + cfg.storageTimeoutMinutes * 60 * 1000
        localStorage.setItem(cfg.storageExpiryTimeKey, expiryTime.toString())
    }

    _isExpired(): boolean {
        const _expiryTime = localStorage.getItem(cfg.storageExpiryTimeKey)

        let expiryTime = 0
        if (_expiryTime !== null) {
            expiryTime = parseInt(_expiryTime)
        }

        if (expiryTime < (new Date()).getTime()) {
            localStorage.clear()
            return true
        }

        this._setExpiryTime()
        return false
    }

    getBoolean(key: string, defaultValue = false): boolean {
        if (this._isExpired()) {
            return defaultValue
        }

        const value = localStorage.getItem(key)
        return value !== 'true' ? defaultValue : true
    }

    getInteger(key: string, defaultValue = 0): number {
        if (this._isExpired()) {
            return defaultValue
        }

        const value = localStorage.getItem(key)
        return value === null ? defaultValue : parseInt(value)
    }

    getString(key: string, defaultValue = ''): string {
        if (this._isExpired()) {
            return defaultValue
        }

        const value = localStorage.getItem(key)
        return value === null ? defaultValue : value
    }

    setBoolean(key: string, value: boolean): void {
        localStorage.setItem(key, value.toString())
        this._setExpiryTime()
    }

    setInteger(key: string, value: number): void {
        localStorage.setItem(key, value.toString())
        this._setExpiryTime()
    }

    setString(key: string, value: string): void {
        localStorage.setItem(key, value)
        this._setExpiryTime()
    }

    remove(key: string): void {
        localStorage.removeItem(key)
        this._setExpiryTime()
    }

    clear(): void {
        localStorage.clear()
        sessionStorage.clear()
    }
}

export const storage = new Storage()
