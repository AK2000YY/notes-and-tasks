import { auth } from '@/auth'
import { db } from '@/db/drizzle';
import { notesTable } from '@/db/schema/notes';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache'
import { ListNoteWithScroll } from './notes-list';


const getNotes = unstable_cache(
    async (userId: string) => {
        const notes = await db
            .select()
            .from(notesTable)
            .where(eq(notesTable.userId, userId))
        return notes;
    },
    ['notes'],
    { revalidate: 3600, tags: ['notes'] }
)

export async function Notes() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return null
    }

    const notes = await getNotes(userId)

    return (
        <ListNoteWithScroll
            noteList={notes}
        />
    );
}