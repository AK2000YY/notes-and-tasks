import { getNote } from "@/app/dashboard/note/update/[id]/page";
import { NoteUpdate } from "@/components/note-update";
import styles from '@/styles/style-body.module.css';


export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const note = await getNote(+id)
    return (
        <div className={styles.overlay}>
            <NoteUpdate
                note={note[0]}
            />
        </div>
    )
}