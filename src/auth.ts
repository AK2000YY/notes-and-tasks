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
            email: {},
            password: {}
        },
        authorize: async (credentials) => {
            let user = null

            user = await db
                .select()
                .from(users)
                .where(and(
                    eq(users.email, "" + credentials.email),
                    eq(users.password, "" + credentials.password)
                ))

            if (user.length === 0) {
                return null;
            }

            console.log('ak' + user[0].email)

            // return user object with their profile data
            return user[0];
        }
    })],
})