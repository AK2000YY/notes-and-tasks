import { addNote } from '@/lib/notes/action';
import styles from '@/styles/style-body.module.css';

export function NoteCreate() {
    return (
        <form action={addNote} className={styles['note-form']}>
            <h1>Create Your Note</h1>
            <input type="text" name="title" placeholder='title' />
            <textarea name="content" placeholder='content'></textarea>
            <button type="submit">Add Note</button>
        </form>
    )
}