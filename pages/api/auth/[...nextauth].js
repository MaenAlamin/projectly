import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      // Check if the user exists in your database
      const userExists = await checkUserExists(email);

      // If the user doesn't exist, save their data to the database
      if (!userExists) {
        await saveUserToDatabase({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      // Return true to continue the sign-in process
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

async function checkUserExists(email) {
  const response = await fetch(`http://localhost:3005/users/${email}`);
  return response.data;
}

async function saveUserToDatabase(userData) {
  const response = await fetch("http://localhost:3005/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.data;
}

export default NextAuth(authOptions);
