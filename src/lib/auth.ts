import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

/**
 * NextAuth konfig for ProPokerTV
 * - Credentials login (email + passord)
 * - PrismaAdapter (bruker User-tabellen din)
 * - JWT-baserte sessions (cookie inneholder signert JWT)
 * - Rolle og bruker-id mappes både inn i tokenet og inn i session.user
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    // Viktig: dette gjør at NextAuth bruker JWT i stedet for DB-sessions
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        // Dette objektet blir utgangspunktet for JWT-tokenet i jwt-callbacken
        return {
          id: user.id,
          name: user.displayName ?? user.name ?? "User",
          email: user.email,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    /**
     * jwt-callback kjøres når et token blir laget/oppdatert.
     * Her sørger vi for at id og role havner i tokenet.
     */
    async jwt({ token, user }) {
      // Første gang (etter login) har vi en user – senere bare token.
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    /**
     * session-callback styrer hva som havner i session-objektet
     * som brukes av useSession() og getServerSession().
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },
};
