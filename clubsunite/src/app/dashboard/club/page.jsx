"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ClubDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();



  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Club Dashboard</h1>
      <p>
        Welcome, <strong>{session.user.name}</strong>!
      </p>
      <p>
        Your Club ID: <strong>{session.user.id}</strong>
      </p>
      <p>
        Role: <strong>{session.user.role}</strong>
      </p>
    </main>
  );
}
