var pool = require('./bd'); // Llamando bd
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUserByUsernameAndPassword }