"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRoleSelection = (selectedRole) => {
    if (isLoading) return;
    setRole(selectedRole);
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !password || !role) {
      setError("Please provide ID, password, and select a role.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      router.push(
        role === "student" ? "/dashboard/student" : "/dashboard/club"
      );
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="/logo.png"
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
            disabled={isLoading}
          >
            Student
          </button>
          <button
            className={`${styles.button} ${
              role === "club" ? styles.active : ""
            }`}
            onClick={() => handleRoleSelection("club")}
            disabled={isLoading}
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
              {role === "student" ? "Registration No" : "Club ID"}
            </label>
            <input
              id="id"
              className={styles.input}
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={`Enter your ${
                role === "student" ? "Registration No" : "Club ID"
              }`}
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
