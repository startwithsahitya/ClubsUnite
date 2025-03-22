import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export default async function ClubDashboard() {
  const session = await auth();

  // Redirect if not logged in as club
  if (!session?.user || session.user.userType !== "club") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Club Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Welcome, {session.user.name}</h2>
          <p className="text-gray-600">
            This content is only accessible to authenticated clubs.
          </p>
        </div>
      </div>
    </div>
  );
}
