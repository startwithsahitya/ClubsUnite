"use client";

import { redirect } from "next/navigation";

export default function Home() {
  const authenticated = false;
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div>
      <p>{"Humm Achhe Bachhe hai !!"}</p>
    </div>
  );
}
