import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { id, password, userType } = credentials;

        try {
          const connection = await pool.getConnection();
          let query, params;

          if (userType === "student") {
            query = `
              SELECT StudentID as id, Name, RegistrationNo 
              FROM Students 
              WHERE RegistrationNo = ? AND Password = ?
            `;
            params = [id, password];
          } else {
            query = `
              SELECT ClubID as id, ClubName as name 
              FROM Clubs 
              WHERE ClubID = ? AND Password = ?
            `;
            params = [id, password];
          }

          const [rows] = await connection.query(query, params);
          connection.release();

          if (rows.length > 0) {
            return {
              id: rows[0].id,
              name: userType === "student" ? rows[0].Name : rows[0].name,
              registrationNo:
                userType === "student" ? rows[0].RegistrationNo : null,
              userType: userType,
            };
          }
          return null;
        } catch (error) {
          console.error("Database error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.registrationNo = user.registrationNo;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userType = token.userType;
      session.user.registrationNo = token.registrationNo;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
