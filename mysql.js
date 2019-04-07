const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
console.log(conf[1].host,conf[1].database)
const connection = mysql.createConnection({
    host:conf[1].host,
    user:conf[1].user,
    password:conf[1].password,
    port:conf[1].port, 
    database:conf[1].database
});

module.exports = connection;