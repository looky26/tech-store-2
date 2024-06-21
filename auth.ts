import { XataAdapter } from "@auth/xata-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import { XataClient } from "./src/xata";

const client = new XataClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: XataAdapter(client),
  providers: [GitHub, Google],
  
});
