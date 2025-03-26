import { NoteCreate } from "@/components/note-create";
import styles from '@/styles/style-body.module.css';

export default function Page() {
    return (
        <div className={styles.overlay}>
            <NoteCreate />
        </div>
    )
}