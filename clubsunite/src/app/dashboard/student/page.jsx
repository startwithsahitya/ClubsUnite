"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Student Dashboard</h1>
      <p>
        Welcome, <strong>{session.user.name}</strong>!
      </p>
      <p>
        Your Registration No: <strong>{session.user.id}</strong>
      </p>
      <p>
        Role: <strong>{session.user.role}</strong>
      </p>
    </main>
  );
}
