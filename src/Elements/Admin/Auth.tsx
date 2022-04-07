
import { storage } from '../../Libs/Storage'

export function adminCheckAuth(): boolean {
    const isLoggedIn = storage.getString('adminId') !== ''

    if (isLoggedIn) {
        return true
    }

    window.location.href = '/admin/login'
    return false
}
