import { pool } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, password, role } = req.body;

  if (!id || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    let query = "";
    let values = [];

    if (role === "student") {
      query =
        "SELECT * FROM Students WHERE RegistrationNo = ? AND Password = ?";
      values = [id, password];
    } else if (role === "club") {
      query = "SELECT * FROM Clubs WHERE ClubID = ? AND Password = ?";
      values = [id, password];
    } else {
      return res.status(400).json({ message: "Invalid role selected." });
    }

    const [rows] = await pool.query(query, values);

    if (rows.length > 0) {
      return res
        .status(200)
        .json({ message: "Login successful!", user: rows[0] });
    } else {
      return res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
}
