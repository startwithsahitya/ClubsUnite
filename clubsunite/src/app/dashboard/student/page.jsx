import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== "student") {
    redirect("/login");
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome {session.user.name}</p>
      <p>Registration No: {session.user.registrationNo}</p>
    </div>
  );
}
