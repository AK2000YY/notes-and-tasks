import { date, integer, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const tasksTable = pgTable('tasks', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    title: text('title'),
    content: text('content'),
    date: date('date').defaultNow(),
    userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
});