'use client'

import { deleteTask } from "@/lib/tasks.ts/action";
import { useActionState } from "react";
import styles from '@/styles/style-body.module.css'
import Link from "next/link";

const initialState = {
    message: ''
}

export function TaskDelete({ id }: {
    id: number
}) {

    const deleteTaskWithId = (prevState: any, formData: FormData) =>
        deleteTask(prevState, id, formData);

    const [state, formAaction, pendding] = useActionState(deleteTaskWithId, initialState)

    return (
        <form action={formAaction} className={styles['delete-note-form']}>
            <h1>Confirm Delete</h1>
            <p>Are you sure to delete it?</p>
            <div className={styles.buttons}>
                <button className={styles['cancel-button']}>
                    <Link href={'/dashboard'}>Cancel</Link>
                </button>
                <button className={styles['delete-button']} disabled={pendding}>Delete</button>
            </div>
            {state.message && <p>{state.message}</p>}
        </form>
    )
}