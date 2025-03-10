"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const SessionProvider = ({ children }: PropsWithChildren) => {
  return <NextAuthSessionProvider> {children} </NextAuthSessionProvider>;
};

export default SessionProvider;
