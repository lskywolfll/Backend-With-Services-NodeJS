const sql = require('mssql');

const SqlConnection = new sql.ConnectionPool({
    user: "yourUser",
    password: "yourPassoword",
    server: "server",
    database: "nameDatabase",
    port: 1433,
    connectionTimeout: 30000,
    requestTimeout: 15000,
    options: {
        encrypt: true,
        enableArithAbort: true
    },
    pool: {
        max: 1,
        min: 0,
        idleTimeoutMillis: 600000,
        acquireTimeoutMillis: 600000
    },
})
    .connect()
    .then(pool => {
        console.log(`Connected to sqlServer`);

        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad config: ', err));

module.exports = {
    SqlConnection,
    sql
}