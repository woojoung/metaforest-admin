
export function padZero(num: number): string {
    return (num < 10) ? '0' + num.toString() : num.toString()
}

class LocalTime extends Date {
    constructor(date?: number | string | Date) {
        if (typeof date !== 'undefined') {
            super(date)
        } else {
            super()
        }
    }

    addDays(days: number): void {
        this.setDate(this.getDate() + days)
    }

    prevMonth(): void {
        const tmpDate = new LocalTime()
        tmpDate.setDate(1)
        tmpDate.setMonth(tmpDate.getMonth() - 1)

        this.setMonth(this.getMonth() - 1)
        while (tmpDate.getMonth() !== this.getMonth()) {
            this.addDays(-1)
        }
    }

    nextMonth(): void {
        const tmpDate = new LocalTime()
        tmpDate.setDate(1)
        tmpDate.setMonth(tmpDate.getMonth() + 1)

        this.setMonth(this.getMonth() + 1)
        while (tmpDate.getMonth() !== this.getMonth()) {
            this.addDays(-1)
        }
    }

    addMonths(months: number): void {
        if (months === 0) {
            return
        } else if (months < 0) {
            for (let i = 0; i > months; --i) {
                this.prevMonth()
            }
        } else if (months > 0) {
            for (let i = 0; i < months; ++i) {
                this.nextMonth()
            }
        }
    }

    prevYear(): void {
        const tmpMonth = this.getMonth()

        this.setFullYear(this.getFullYear() - 1)
        if (tmpMonth !== this.getMonth()) {
            this.addDays(-1)
        }
    }

    nextYear(): void {
        const tmpMonth = this.getMonth()

        this.setFullYear(this.getFullYear() + 1)
        while (tmpMonth !== this.getMonth()) {
            this.addDays(-1)
        }
    }

    addYears(years: number): void {
        if (years === 0) {
            return
        } else if (years < 0) {
            for (let i = 0; i > years; --i) {
                this.prevYear()
            }
        } else if (years > 0) {
            for (let i = 0; i < years; ++i) {
                this.nextYear()
            }
        }
    }

    toYearMonthFormat(separator = '-'): string {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)

        return [year, month].join(separator)
    }

    toDateFormat(separator = '-'): string {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)
        const dayOfMonth = padZero(this.getDate())

        return [year, month, dayOfMonth].join(separator)
    }

    toDateTimeFormat(): string {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)
        const dayOfMonth = padZero(this.getDate())
        const hour = padZero(this.getHours())
        const minute = padZero(this.getMinutes())
        const second = padZero(this.getSeconds())

        return [year, month, dayOfMonth].join('-') + ' ' + [hour, minute, second].join(':')
    }

    toPlanStartDateTimeFormat(): string {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)
        const dayOfMonth = padZero(this.getDate())
        const hour = '00'
        const minute = '00'
        const second = '00'

        return [year, month, dayOfMonth].join('-') + ' ' + [hour, minute, second].join(':')
    }

    toPlanExpiryDateTimeFormat(): string {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)
        const dayOfMonth = padZero(this.getDate())
        const hour = '23'
        const minute = '59'
        const second = '59'

        return [year, month, dayOfMonth].join('-') + ' ' + [hour, minute, second].join(':')
    }

    toInt(): number {
        const year = this.getFullYear()
        const month = padZero(this.getMonth() + 1)
        const dayOfMonth = padZero(this.getDate())
        const hour = padZero(this.getHours())
        const minute = padZero(this.getMinutes())
        const second = padZero(this.getSeconds())

        return parseInt([year, month, dayOfMonth, hour, minute, second].join(''))
    }

    toHourMinuteFormat(separator = ':'): string {
        const hour = padZero(this.getHours())
        const minute = padZero(this.getMinutes())

        return [hour, minute].join(separator)
    }
}

export function newTime(date?: number | string | Date): LocalTime {
    return new LocalTime(date)
}

export function yearMonth(seperator = '-'): string {
    return (new LocalTime()).toYearMonthFormat(seperator)
}

export function today(seperator = '-'): string {
    return (new LocalTime()).toDateFormat(seperator)
}

export function nowStr(): string {
    return (new LocalTime()).toDateTimeFormat()
}

export function nowInt(): number {
    return (new LocalTime()).toInt()
}

export function toLocalTimeStr(date: undefined | string): string {
    if (typeof date === 'undefined') {
        return '1970-01-01 00:00:00'
    }

    const d = new Date(date)

    const year = d.getFullYear()
    const month = padZero(d.getMonth() + 1)
    const dayOfMonth = padZero(d.getDate())
    const hour = padZero(d.getHours())
    const minute = padZero(d.getMinutes())
    const second = padZero(d.getSeconds())

    return [year, month, dayOfMonth].join('-') + ' ' + [hour, minute, second].join(':')
}
