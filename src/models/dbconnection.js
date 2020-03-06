const mysql = require('mysql');

module.exports = ()=>{
/*
        host:'198.71.225.53',
        user: 'jose',
        password:'Jo.dussan',
        database:'SH'

        host:'localhost',
        user: 'root',
        password:'Jo.dussan',
        database:'sincro_honda'
*/
    return mysql.createConnection({
        host:'198.71.225.53',
        user: 'jose',
        password:'Jo.dussan',
        database:'SH'
    })
    
}