const mysql = require('mysql2');

// Create connection to database
const db = mysql2.createConnection(
    {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ferguson459',
    database: 'employee_db'
}

);


module.exports = db;