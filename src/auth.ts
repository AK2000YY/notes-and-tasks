import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/drizzle"
import { users } from "./db/schema/users"
import { accounts } from "./db/schema/accounts"
import { sessions } from "./db/schema/sessions"
import { verificationTokens } from "./db/schema/verificationTokens"
import Credentials from "next-auth/providers/credentials"
import { and, eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [Google, Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            let user = null

            let email = credentials.email as string;
            let password = credentials.password as string;

            user = await db
                .select()
                .from(users)
                .where(and(
                    eq(users.email, email),
                    eq(users.password, password)
                ))

            if (user.length === 0 || !password.trim()) {
                throw new Error("Invalid email or password");
            }

            return {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email
            };
        }
    })],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
    },
})