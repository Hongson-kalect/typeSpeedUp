import GoogleProvider from "next-auth/providers/google";
providers: [
  GoogleProvider({
    clientId: env("GOOGLE_CLIENT_ID"),
    clientSecret: env("GOOGLE_CLIENT_SECRET"),
  }),
];
