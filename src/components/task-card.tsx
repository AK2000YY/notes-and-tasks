'use client'

import styles from '@/styles/style-body.module.css'
import { Task } from "./task-list";
import { MdDelete } from 'react-icons/md';

export function TaskCard({ task }: {
    task: Task
}) {
    return (
        <div className={styles['task-card']}>
            <input type="checkbox" name="executed" defaultChecked={task.executed || false} />
            <p>{task.title}</p>
            <form action="">
                <MdDelete className={styles.icon} />
            </form>
        </div>
    )
}