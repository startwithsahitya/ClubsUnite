"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "student") {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Student Dashboard</h1>
      <p>
        Welcome, <strong>{user.name}</strong>!
      </p>
      <p>
        Your Registration No: <strong>{user.id}</strong>
      </p>
      <p>
        Role: <strong>{user.role}</strong>
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </main>
  );
}
