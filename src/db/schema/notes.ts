import { date, integer, pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const notesTable = pgTable('notes', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title: text('title'),
    content: text('content'),
    date: date('date').defaultNow(),
    userId: integer('userId').references(() => usersTable.id, { onDelete: 'cascade' }),
});