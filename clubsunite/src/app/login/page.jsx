"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setError(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!id || !password || !role) {
      setError("Please provide ID, password, and select a role.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Hardcoded login for student and club
    if (
      (role === "student" && id === "REG2024001" && password === "pass1234") ||
      (role === "club" &&
        ["C01", "C02", "C03"].includes(id) &&
        password === "pass1234")
    ) {
      const userData = {
        id,
        role,
        name: role === "student" ? "Student User" : `Club ${id}`,
      };
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
      router.push(
        role === "student" ? "/dashboard/student" : "/dashboard/club"
      );
      setIsLoading(false);
      return;
    }

    setError("Invalid credentials.");
    setIsLoading(false);
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="https://drive.google.com/uc?id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
          alt="Login Icon"
          width={197}
          height={54}
          priority
        />
      </div>

      <div className={styles.boxContainer}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              role === "student" ? styles.active : ""
            }`}
            onClick={() => handleRoleSelection("student")}
          >
            Student
          </button>
          <button
            className={`${styles.button} ${
              role === "club" ? styles.active : ""
            }`}
            onClick={() => handleRoleSelection("club")}
          >
            Club
          </button>
        </div>

        {role && (
          <p className={styles.roleInfo}>
            Logging in as: <strong>{role}</strong>
          </p>
        )}

        {role && (
          <form className={styles.inputContainer} onSubmit={handleLogin}>
            <label className={styles.label} htmlFor="id">
              {role === "student" ? "Student ID" : "Club ID"}
            </label>
            <input
              id="id"
              className={styles.input}
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={`Enter your ${role} ID`}
              required
            />

            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button
              className={styles.mainButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </button>

            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
