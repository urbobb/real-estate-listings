import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  theme: {
    logo: "/assets/mainpageSearchBg.png",
  }, // add logo to the login page
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
});
