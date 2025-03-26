import { db } from '@/db/drizzle'
import { notesTable } from '@/db/schema/notes'
import styles from '@/styles/style-body.module.css'
import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'

const getNote = unstable_cache(
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

export async function NoteView({ id }: {
    id: number
}) {
    const note = await getNote(id)
    return (
        <div className={styles['note-show']}>
            <h1>{note[0].title}</h1>
            <p>{note[0].date}</p>
            <p>{note[0].content}</p>
            <Link href={'/dashboard'}>
                <IoClose className={styles.close} />
            </Link>
        </div>
    )
}