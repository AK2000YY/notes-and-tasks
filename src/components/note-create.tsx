'use client'

import { addNote } from '@/lib/notes/action';
import styles from '@/styles/style-body.module.css';
import { useRouter } from 'next/navigation'
import { useActionState } from 'react';
import { IoClose } from 'react-icons/io5';

const initialState = {
    message: '',
    title: '',
    content: ''
}

export function NoteCreate() {
    const [state, formAction, pendding] = useActionState(addNote, initialState);
    const router = useRouter()
    return (
        <form action={formAction} className={styles['note-form']}>
            <h1>Create Your Note</h1>
            <input type="text" name="title" placeholder='title' />
            {state.title && <p>{state.title}</p>}
            <textarea name="content" placeholder='content'></textarea>
            {state.content && <p>{state.content}</p>}
            <button type="submit" disabled={pendding}>Add Note</button>
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