import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

// Extend NextAuth types to include id field
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
  
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("SignIn callback triggered:", { 
          userEmail: user.email, 
          provider: account?.provider,
          profileEmail: profile?.email 
        });

        // Add null check for user email
        if (!user.email) {
          console.error("User email is required for sign in");
          return false;
        }

        console.log("Checking for existing user with email:", user.email);
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        if (!existingUser) {
          await prisma.user.create({ 
            data: { 
              email: user.email,
              lastLogin: new Date()
            } 
          });
        } else {
          // Update last login time for existing user
          await prisma.user.update({
            where: { email: user.email },
            data: { lastLogin: new Date() }
          });
        }
        
        console.log("SignIn callback completed successfully");
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user && user.email) {
        // Find the user in database to get the proper ID
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Properly map token data to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful sign in
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/dashboard`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};