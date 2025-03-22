import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        const { id, password, userType } = credentials;

        if (!id || !password || !userType) {
          throw new Error("Missing credentials");
        }

        try {
          let query, values;

          if (userType === "student") {
            query =
              "SELECT * FROM Students WHERE RegistrationNo = ? AND Password = ?";
            values = [id, password];
          } else if (userType === "club") {
            query = "SELECT * FROM Clubs WHERE ClubID = ? AND Password = ?";
            values = [id, password];
          } else {
            throw new Error("Invalid user type");
          }

          const [rows] = await pool.query(query, values);

          if (rows.length === 0) {
            throw new Error("Invalid credentials");
          }

          const user = rows[0];

          return {
            id: userType === "student" ? user.RegistrationNo : user.ClubID,
            name: userType === "student" ? user.Name : user.ClubName,
            role: userType,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Database error");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
