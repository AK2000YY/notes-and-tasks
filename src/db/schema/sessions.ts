import { boolean, timestamp, pgTable, text, primaryKey, integer } from "drizzle-orm/pg-core"
import { users } from "./users"

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})