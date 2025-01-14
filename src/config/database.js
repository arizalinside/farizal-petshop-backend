const mysql = require('mysql2');
const dotencv = require('dotenv');

dotencv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

pool.getConnection((err, connection) => {
  if (err) { 
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Database connected successfully!');
  connection.release();
});

module.exports = pool.promise();