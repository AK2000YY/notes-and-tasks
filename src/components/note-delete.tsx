import styles from '@/styles/style-body.module.css'

export function NoteDelete({ id }: {
    id: number
}) {
    return (
        <form className={styles['delete-note-form']}>
            <h1>Confirm Delete</h1>
            <p>Are you sure to delete it?</p>
            <div className={styles.buttons}>
                <button className={styles['cancel-button']}>Cancel</button>
                <button className={styles['delete-button']}>Delete</button>
            </div>
        </form>
    )
}