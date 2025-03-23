import styles from '@/styles/style-body.module.css';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

interface NoteType {
    id: number;
    title?: string | null;
    content?: string | null;
    date?: string | null;
    userId?: string | null
}

export function NoteUpdate({ note }: {
    note: NoteType
}) {
    return (
        <form action="" className={styles['note-form']}>
            <h1>Edit Your Note</h1>
            <input type="text" name="title" placeholder='title' defaultValue={note.title || ''} />
            <textarea name="content" placeholder='content' defaultValue={note.content || ''}></textarea>
            <button type='submit'>Update Note</button>
            <Link href={'/dashboard'}>
                <IoClose className={styles.close} />
            </Link>
        </form>
    )
}