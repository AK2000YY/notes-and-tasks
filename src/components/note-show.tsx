import styles from '@/styles/style-body.module.css'
import { getNote } from "@/app/dashboard/note/update/[id]/page"
import Link from 'next/link'
import { IoClose } from 'react-icons/io5'

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