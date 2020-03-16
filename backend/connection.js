const mysql = require('mysql');
const dbConfig = require('./db.config')

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect((error) => {
    if (!error) {
        console.log("Successfully connected to the db")
    } else {
        console.log("Problem with connection to the db")
        throw error;
    }
});

module.exports = connection;