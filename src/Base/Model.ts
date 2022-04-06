
export interface Columns {
    [key: string]: { type: string, name: string }
}

export class Model {
    table: string
    primaryKey: string
    columns: Columns

    constructor(table: string, primaryKey: string, columns: Columns) {
        this.table = table
        this.primaryKey = primaryKey
        this.columns = columns
    }
}
