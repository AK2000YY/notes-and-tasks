import styles from '@/styles/style-body.module.css'
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
                    <MdDelete className={styles.icon} />
                    <MdEdit className={styles.icon} />
                </div>
                <FaArrowRight />
            </div>
        </>
    )
}