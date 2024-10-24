import { Logger } from "@/lib/logger";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          Logger.error("NextAuthOptions", `Email or password missing`);
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: credentials.email,
              mode: "insensitive",
            },
          },
        });

        if (!user) {
          Logger.error(
            "NextAuthOptions",
            `User not found: ${credentials.email}`
          );
          return null;
        }

        let passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          const saltedPassword = bcrypt.hashSync(credentials.password, 10);

          if (saltedPassword !== user.password) {
            Logger.error(
              "NextAuthOptions",
              `Password does not match for user: ${credentials.email} - ${saltedPassword} <> ${user.password}`
            );
          } else {
            Logger.info(
              "NextAuthOptions",
              `Password match for user: ${credentials.email}`
            );

            passwordMatch = true;
          }
        }

        if (!passwordMatch) {
          Logger.error(
            "NextAuthOptions",
            `Password does not match for user: ${credentials.email} - ${credentials.password} <> ${user.password}`
          );
          return null;
        }

        if (user.pending) {
          Logger.error("NextAuthOptions", `User pending: ${credentials.email}`);
          try {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                pending: false,
              },
            });
          } catch (error) {
            Logger.error(
              "NextAuthOptions",
              `Error updating user pending status: ${credentials.email}`
            );
          }
        }

        Logger.info("NextAuthOptions", `User logged in: ${credentials.email}`);
        try {
          await prisma.logEvent.create({
            data: {
              userId: user.id,
              type: "LOGIN",
              data: {
                email: user.email,
              },
            },
          });
        } catch (error) {
          Logger.error(
            "NextAuthOptions",
            `Error logging event: ${credentials.email}`
          );
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
        },
      };
    },
    jwt: async ({ token, user }) => {
      const u = user as unknown as User;
      if (user) {
        return {
          ...token,
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          role: u.role,
        };
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};
