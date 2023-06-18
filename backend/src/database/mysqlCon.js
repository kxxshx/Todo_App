let mysql = require('mysql');

let util = require('util');

let pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    user: 'root',
    password: 'robomq',
    database: 'User_Info',
});

pool.query = util.promisify(pool.query)

module.exports = pool
