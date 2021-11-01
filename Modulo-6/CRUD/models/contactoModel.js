var pool = require('./bd');

// insertar contacto
async function insertContacto(obj) {
    try {
        var query = "insert into contacto set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { insertContacto }