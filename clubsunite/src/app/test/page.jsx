"use client"; // If using Next.js 13 with App Router and need client-side interactivity

import React from "react";
import LeftNav from "../components/leftnav";
import BudgetLayout from "../components/BudgetLayout";
import Sidebar from "../components/SideBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black p-4">
      <Sidebar
      />
    </main>
  );
}
