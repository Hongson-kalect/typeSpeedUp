"use client";

import { signIn, useSession } from "next-auth/react";
import * as React from "react";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const { data: session } = useSession();

  console.log("session :>> ", session);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
