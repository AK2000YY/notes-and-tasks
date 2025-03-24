import styles from '@/styles/style-body.module.css'
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md';

interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
}

export function NoteCard({ note }: { note: Note }) {
    return (
        <>
            <div className={styles['note-detail']}>
                <FaNoteSticky className={styles.icon} />
                <div className={styles.detail}>
                    <h3>{note.title}</h3>
                    <p>{note.date}</p>
                </div>
            </div>
            <div className={styles.icons}>
                <div>
                    <Link href={`/dashboard/note/delete/${note.id}`}><MdDelete className={styles.icon} /></Link>
                    <Link href={`/dashboard/note/update/${note.id}`}><MdEdit className={styles.icon} /></Link>
                </div>
                <Link href={`/dashboard/note/show/${note.id}`}><FaArrowRight className={styles.icon} /></Link>
            </div>
        </>
    )
}