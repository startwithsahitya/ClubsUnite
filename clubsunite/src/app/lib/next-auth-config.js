// lib/next-auth-config.js
const Credentials = require("next-auth/providers/credentials");
const { queryStudentById, queryClubById } = require("./db");

const nextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (
            !credentials.userType ||
            !credentials.id ||
            !credentials.password
          ) {
            return null;
          }

          const userType = credentials.userType;
          const id = credentials.id;
          const password = credentials.password;

          let user;
          if (userType === "student") {
            user = await queryStudentById(Number(id));
          } else if (userType === "club") {
            user = await queryClubById(Number(id));
          }

          if (!user || user.Password !== password) return null;

          return {
            id: (user.StudentID || user.ClubID).toString(),
            name: user.Name || user.ClubName, // This is correctly set
            email: user.Email,
            userType,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.id = user.id;
        token.name = user.name; // Add name to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userType = token.userType;
        session.user.id = token.id;
        session.user.name = token.name; // Add name to session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

module.exports = { nextAuthConfig };
