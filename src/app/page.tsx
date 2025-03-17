import { db } from "@/db/drizzle"
import { notesTable } from "@/db/schema/notes";
import { usersTable } from "@/db/schema/users"
import { eq } from "drizzle-orm";

export default async function Page() {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, 'abody@gmail.com'));
  const notes = await db.select().from(notesTable).where(eq(notesTable.userId, user[0].id));
  return (
    <>
      <h1>USERS</h1>
      <h3>{user[0].name}</h3>
      <h4>Notes for him</h4>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <h5>Title: {note.title}</h5>
            <p>content: {note.content}</p>
          </li>
        )}
      </ul>
    </>
  )
}