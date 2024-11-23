import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/providers/prismaClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log("run into signIn");
      console.log(
        "user, account, profile, email, credentials :>> ",
        user,
        account,
        profile,
        email,
        credentials
      );
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("run into redirect");
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("run into session", session, token);
      session.user.id = token?.sub;
      session.user.name = token?.name;
      session.user.email = token?.email;
      session.user.image = token?.picture;
      session.user.role = token?.role;
      session.start = token?.iat; //token created
      session.end = token?.exp; //token created

      console.log("session after:>> ", session);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("run into jwt", token, user);
      if (user) {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
        token.picture = user?.image;
        token.role = user?.role; // Include the new field
        console.log("token after ", token);
      }
      return token;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
