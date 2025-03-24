import styles from '@/styles/style-body.module.css'
import { TaskCard } from './task-card'

export type Task = {
    id: number,
    title?: string | null,
    executed?: boolean | null,
    date?: string | null,
    userId?: string | null
}

export function TaskList({ taskList }: {
    taskList: Task[]
}) {
    return (
        <div className={styles.tasks}>
            <h1>Today's Tasks</h1>
            <button className={styles['add-button']}>
                + Add new task
            </button>
            <div className={styles['tasks-list']}>
                {taskList.map(ele =>
                    <TaskCard
                        key={ele.id}
                        task={ele}
                    />
                )}
            </div>
        </div>
    )
}