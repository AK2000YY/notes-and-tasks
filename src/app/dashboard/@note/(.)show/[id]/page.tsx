import styles from '@/styles/style-body.module.css';
import { NoteView } from "@/components/note-show";

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <div className={styles.overlay}>
            <NoteView id={+id} />
        </div>
    )
}