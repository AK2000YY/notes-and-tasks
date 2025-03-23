'use client'

import { deleteNote } from '@/lib/notes/action'
import styles from '@/styles/style-body.module.css'
import Link from 'next/link'
import { useActionState } from 'react'

const initialState = {
    message: ''
}

export function NoteDelete({ id }: {
    id: number
}) {

    const deleteNoteWithId = (prevState: any, formData: FormData) =>
        deleteNote(prevState, id, formData);

    const [state, formAaction, pendding] = useActionState(deleteNoteWithId, initialState)

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