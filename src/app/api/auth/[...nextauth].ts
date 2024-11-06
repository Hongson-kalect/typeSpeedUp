import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/providers/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, user }) {
      console.log("session  cb q:>> ", session);
      // Add custom user data to the session object
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.email = user.email;
      session.user.image = user.image;
      return session;
    },
  },
});

// export default NextAuth(authOptions);
