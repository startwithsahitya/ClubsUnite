import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function StudentDashboard() {
  const session = await auth();

  // Redirect if not logged in as student
  if (!session?.user || session.user.userType !== "student") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">
            Welcome, Student ID: {session.user.id}
          </h2>
          <p className="text-gray-600">Student Name: {session.user.name}</p>
        </div>
      </div>
    </div>
  );
}
