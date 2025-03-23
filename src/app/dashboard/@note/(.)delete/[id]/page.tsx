import { NoteDelete } from '@/components/note-delete'
import styles from '@/styles/style-body.module.css'

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    console.log('ak', id)
    return (
        <div className={styles.overlay}>
            <NoteDelete
                id={+id}
            />
        </div>
    )
}