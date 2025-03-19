import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/drizzle"
import { users } from "./db/schema/users"
import { accounts } from "./db/schema/accounts"
import { sessions } from "./db/schema/sessions"
import { verificationTokens } from "./db/schema/verificationTokens"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [Google],
})