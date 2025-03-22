import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ClubDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== "club") {
    redirect("/login");
  }

  return (
    <div>
      <h1>Club Dashboard</h1>
      <p>Welcome {session.user.name}</p>
      <p>Club ID: {session.user.id}</p>
    </div>
  );
}
