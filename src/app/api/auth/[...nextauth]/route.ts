import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/providers/prismaClient";
// import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
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
    async session({ session, token }) {
      console.log("session  cb:>> ", session, token);
      // Add custom user data to the session object
      session.user.id = token?.id;
      session.user.name = token?.name;
      session.user.email = token?.email;
      session.user.image = token?.picture;
      session.user.role = token?.role; // Include the new field
      return session;
    },
    async jwt({ token, user }) {
      console.log("token,user :>> ", token, user);
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
        token.picture = user?.image;
        token.role = user?.role; // Include the new field
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
