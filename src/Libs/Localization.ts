
import { cfg } from '../Base/Config'

const _text: { [locale: string]: { [key: string]: string } } = {
    'ko-KR': {
        NONE: '',

        FREE_TRIAL: 'FREE_TRIAL',
        BASIC: 'BASIC',
        PRO: 'PRO',
        PREMIUM: 'PREMIUM',
        
        
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
