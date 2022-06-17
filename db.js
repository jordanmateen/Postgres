const pgPromise = require('pg-promise')();
const config = {
    host: 'localhost',
    port: 5432,
    database: 'db_class_lecture'
};
const db = pgPromise(config);

/**
 * DB Library
 * getAll: 
 *      @param table: the name of the table you want to retrieve data from
 * getOneById:
 *      @param table: the name of the table you want to retrieve data from
 *      @param id: the id of data you want to retrieve
 * insertOneEngineer:
 *      @param table: the name of the table you want to insert data into
 *      @param data: An array of the data to be inserted. The indices of the array must follow the order of columns list next to the table name. 
 *                  SEE SQL Syntax && insertOneEngineer function call for more info on columns used
 * updateEngineerById:
 *      @param table: the name of the table you want to insert data into
 *      @param data: An array of the data to be inserted. The indices of the array must follow the order of columns  listed after the SET clause.
 *                   The last index in the array must be the id of which you want to update. 
 */

module.exports = {
    getAll: async (table) => {
        return await db.any(`SELECT * FROM ${table}`)
    },
    getOneById: async (table, id) => {
        return await this.db.any(`SELECT * FROM ${table} WHERE id = $1`, [id])
    },
    insertOneEngineer: async (table, data) => {
        await db.none(`INSERT INTO ${table} (name, email) VALsUES($1, $2)`, data)
    },
    updateEngineerById: async (table, data) => {
        await db.none(`UPDATE ${table} SET name = $1, email = $2 WHERE id = $3`, data)
    }
}
