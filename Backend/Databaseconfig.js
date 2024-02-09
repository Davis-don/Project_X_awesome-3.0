const mysql=require('mysql2')


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '0000000000',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database:'winky_webbers_db'
  });

  module.exports=pool