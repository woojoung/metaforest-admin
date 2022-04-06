
import { Any } from '../Base/Type'

export const getParam = (name: string, defaultValue: Any): Any => {
    const queryString = window.location.search.substring(1)
    if (queryString === '') {
        return defaultValue
    }

    const pairs = queryString.split('&')
    let index = -1
    for (let i = 0; i < pairs.length; ++i) {
        index = pairs[i].indexOf('=')
        if (index === -1) {
            continue
        }

        const pair = []
        pair.push(pairs[i].substring(0, index))
        pair.push(pairs[i].substring(index + 1))

        if (name === decodeURIComponent(pair[0])) {
            return decodeURIComponent(pair[1])
        }
    }

    return defaultValue
}
