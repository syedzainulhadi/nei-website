// =====================================================
// config/db.js - MySQL Database Connection
// =====================================================

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create a connection pool (better than single connection)
// A pool reuses connections instead of creating a new one every time
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // usually 'localhost'
  user: process.env.DB_USER,       // usually 'root'
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,             // max 10 simultaneous connections
  queueLimit: 0
});

// Convert pool to use Promises so we can use async/await
const db = pool.promise();

// Test the connection immediately when this file loads
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL Database connected successfully!");
    connection.release(); // Always release connection back to pool
  }
});

module.exports = db;