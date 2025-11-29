import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          // NOTE: password field is not yet on the User model; we will extend it later
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.displayName || user.name || null,
          image: user.avatarUrl || user.image || null,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // initial sign-in
        token.role = (user as any).role ?? "USER";
        token.name = user.name ?? token.name;
        (token as any).avatar =
          (user as any).avatarUrl || (user as any).image || null;
      } else {
        // sync role/name/avatar from DB on subsequent requests
        if (token.sub) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.name = dbUser.displayName || dbUser.name || token.name;
            (token as any).avatar = dbUser.avatarUrl || dbUser.image || null;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role ?? "USER";
        session.user.name = token.name ?? session.user.name;
        session.user.image =
          ((token as any).avatar as string | null | undefined) ??
          session.user.image ??
          null;
      }
      return session;
    },
  },
};
