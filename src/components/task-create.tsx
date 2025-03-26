'use client'

import { createTask } from '@/lib/tasks.ts/action';
import styles from '@/styles/style-body.module.css';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { IoClose } from 'react-icons/io5';

const initialState = {
    message: '',
    title: ''
}

export function TaskCreate() {

    const [state, formAction, pendding] = useActionState(createTask, initialState);
    const router = useRouter()

    return (
        <form action={formAction} className={styles['task-form']}>
            <h1>Create Your Task</h1>
            <input type="text" name="title" placeholder='title' />
            {state.title && <p>{state.title}</p>}
            <button type="submit" disabled={pendding}>Add Task</button>
            {state.message && <p>{state.message}</p>}
            <IoClose
                className={styles.close}
                onClick={() =>
                    router.back()
                }
            />
        </form >
    )
}