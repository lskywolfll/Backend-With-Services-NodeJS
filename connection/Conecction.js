const { pool } = require('./ConnectionSqlServer');


async function SqlConnection(Query, parametros) {
    try {
        const conexion = await pool;
        const request = await conexion.request(parametros);
        const resultado = await request.execute(Query);
        
        return resultado;
    } catch (error) {
        return error;
    }
}

module.exports = {
    SqlConnection
}