export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnProtected) {
        return isLoggedIn;
      }
      return true;
    },
  },
};
