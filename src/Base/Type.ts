
export type Any = any

export interface Indexable {
    [key: string]: Any
}

export type PromiseCallback = ((value?: Any) => void)

export function integer(variable: Any, defaultValue = 0): number {
    const parsedInteger = parseInt(variable)

    return isNaN(parsedInteger) ? defaultValue : parsedInteger
}

export function undefinedToString(undefinedOrString: undefined | string): string {
    return typeof undefinedOrString === 'undefined' ? '' : undefinedOrString
}
