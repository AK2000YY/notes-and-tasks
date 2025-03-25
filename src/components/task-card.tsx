'use client'

import styles from '@/styles/style-body.module.css'
import { Task } from "./task-list";
import { MdDelete } from 'react-icons/md';
import { useActionState } from 'react';
import { toggleTask } from '@/lib/tasks.ts/action';
import Link from 'next/link';

const initialState = {
    message: ''
}

export function TaskCard({ task }: {
    task: Task
}) {
    const toggleStateWithId = (prevState: any) =>
        toggleTask(prevState, task.id)
    const [state, formAction, pendding] = useActionState(toggleStateWithId, initialState)
    return (
        <>
            <div className={styles['task-card']}>
                <form action={formAction}>
                    <input
                        type="checkbox"
                        name="executed"
                        defaultChecked={task.executed || false}
                        disabled={pendding || task.executed || false}
                    />
                    <button type='submit' disabled={pendding || task.executed || false}></button>
                </form>
                <p className={task.executed ? styles.disabled : ''}>{task.title}</p>
                <Link href={`/dashboard/task/delete/${task.id}`}><MdDelete className={task.executed ? styles['icon-disable'] : styles.icon} /></Link>
            </div >
            {state?.message && <p className={styles.error}>{state.message}</p>}
        </>
    )
}