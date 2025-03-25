import styles from '@/styles/style-body.module.css'
import { TaskCard } from './task-card'
import Link from 'next/link'

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
            <Link
                href={'/dashboard/task/create'}
                className={styles['add-button']}>
                + Add new task
            </Link>
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