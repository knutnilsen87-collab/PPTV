// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import { env } from "@/lib/env";
import nodemailer from "nodemailer";
import Postmark from "postmark";

const prisma = new PrismaClient();

function getEmailConfig(){
  if(env.AUTH_EMAIL_PROVIDER === "postmark"){
    const client = new Postmark.ServerClient(process.env.POSTMARK_TOKEN!);
    return {
      async sendVerificationRequest({ identifier, url }){
        await client.sendEmail({
          From: env.AUTH_EMAIL_FROM,
          To: identifier,
          Subject: "Your ProPokerTV sign-in link",
          TextBody: `Sign in: ${url}\nThis link expires in 10 minutes.`,
          HtmlBody: `<p>Sign in:</p><p><a href="${url}">${url}</a></p><p>This link expires in 10 minutes.</p>`
        });
      }
    };
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT||587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  return {
    async sendVerificationRequest({ identifier, url }){
      await transport.sendMail({
        to: identifier,
        from: env.AUTH_EMAIL_FROM,
        subject: "Your ProPokerTV sign-in link",
        text: `Sign in: ${url}\nThis link expires in 10 minutes.`,
        html: `<p>Sign in:</p><p><a href="${url}">${url}</a></p><p>This link expires in 10 minutes.</p>`
      });
    }
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      from: env.AUTH_EMAIL_FROM,
      maxAge: 10 * 60,
      sendVerificationRequest: getEmailConfig().sendVerificationRequest,
    })
  ],
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

