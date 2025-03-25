import { TaskDelete } from '@/components/task-delete'
import styles from '@/styles/style-body.module.css'

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <div className={styles.overlay}>
            <TaskDelete
                id={+id}
            />
        </div>
    )
}