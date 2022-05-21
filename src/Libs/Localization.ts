
import { cfg } from '../Base/Config'

const _text: { [locale: string]: { [key: string]: string } } = {
    'ko-KR': {
        NONE: '',

        FREE_TRIAL: 'FREE_TRIAL',
        BASIC: 'BASIC',
        PRO: 'PRO',
        PREMIUM: 'PREMIUM',

        UNKNOWN : '계정탈퇴',
        USER : '상담자',
        COUNSELOR : '내담자',
        SERVICE_OPERATOR : '운영자',
        SERVICE_ADMIN : '관리자',
        SYSTEM_OPERATOR : '시스템 운영자',
        SYSTEM_ADMIN : '시스템 관리자',
        
    }
}

export function text(key: string): string {
    const locale = cfg.locale
    if (['ko-KR'].includes(locale) === false) {
        return locale + ': Locale Not Supported'
    }

    const value = _text[locale][key]
    if (typeof value === 'undefined') {
        return ''
    }

    return value
}
