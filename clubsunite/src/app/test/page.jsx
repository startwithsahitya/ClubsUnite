"use client"; // If using Next.js 13 with App Router and need client-side interactivity

import React from "react";
import FeedbackDashboard from "../components/FeedbackDashboard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black p-4">
      <FeedbackDashboard
      />
    </main>
  );
}
