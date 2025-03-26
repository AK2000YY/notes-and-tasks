import { NoteUpdate } from '@/components/note-update'
import { db } from '@/db/drizzle'
import { notesTable } from '@/db/schema/notes'
import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import styles from '@/styles/style-body.module.css';


export const getNote = unstable_cache(
    async (noteId: number) => {
        return await db
            .select()
            .from(notesTable)
            .where(
                eq(notesTable.id, noteId)
            )
    },
    ['note'],
    { revalidate: 3600, tags: ['note'] }
)

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const note = await getNote(+id)
    return (
        <div className={styles.overlay}>
            <NoteUpdate
                note={note[0]}
            />
        </div>
    )
}