import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test database connection
db.getConnection()
  .then(() => console.log("✅ MySQL Database Connected Successfully!"))
  .catch((err) => console.error("❌ MySQL Connection Failed:", err));

export default db;
