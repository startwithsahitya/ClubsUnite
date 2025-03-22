import mysql from "mysql2/promise";

// Create the MySQL pool connection
export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Query function to interact with the database
export const query = async (sql, values = []) => {
  try {
    // Execute the query
    const [results] = await pool.execute(sql, values);

    // Return the results
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Database query failed");
  }
};

export async function queryStudentById(studentId) {
  const [rows] = await pool.query(
    "SELECT * FROM Students WHERE StudentID = ?",
    [studentId]
  );
  return rows[0];
}

export async function queryClubById(clubId) {
  const [rows] = await pool.query("SELECT * FROM Clubs WHERE ClubID = ?", [
    clubId,
  ]);
  return rows[0];
}
