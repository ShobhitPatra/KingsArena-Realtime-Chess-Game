import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { JWT } from "next-auth/jwt";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
const GOOGLE_CLIENT_ID =
  "18096936678-lhn5gnqgef68c3mjl3dacp9fpdds7nr9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {},
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, profile, account }) {
      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email!,
          },
        });

        if (user && session.user) {
          session.user.id = user.id;
        }
      } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
          throw new Error("Internal server error");
        }
        console.log(error);
        throw error;
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        if (profile) {
          if (account?.provider === "google") {
            const user = await prisma.user.findFirst({
              where: {
                email: profile?.email,
              },
            });
            if (!user) {
              await prisma.user.create({
                data: {
                  email: profile.email!,
                  name: profile.name!,
                  image: profile.image! || "",
                  provider: "Google",
                },
              });
            }
          }
        }
        return true;
      } catch (error) {
        console.log("error while signing in", error);
        return false;
      }
    },
  },
};
