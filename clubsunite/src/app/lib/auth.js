// lib/auth.js
import { pool } from "./db.js";

export async function authenticateUser(id, password, role) {
  let query = "";
  let params = [];

  if (role === "student") {
    query = "SELECT * FROM Students WHERE RegistrationNo = ? AND Password = ?";
    params = [id, password];
  } else if (role === "club") {
    query = "SELECT * FROM Clubs WHERE ClubID = ? AND Password = ?";
    params = [id, password];
  } else {
    return null;
  }

  try {
    const [rows] = await pool.execute(query, params);

    if (rows.length === 0) return null;

    return {
      id: role === "student" ? rows[0].RegistrationNo : rows[0].ClubID,
      name: role === "student" ? rows[0].Name : rows[0].ClubName,
      role,
    };
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
