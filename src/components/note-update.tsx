'use client'

import { updateNote } from '@/lib/notes/action';
import styles from '@/styles/style-body.module.css';
import Link from 'next/link';
import { useActionState } from 'react';
import { IoClose } from 'react-icons/io5';

interface NoteType {
    id: number;
    title?: string | null;
    content?: string | null;
    date?: string | null;
    userId?: string | null
}

const initialState = {
    message: '',
    title: '',
    content: ''
}

export function NoteUpdate({ note }: {
    note: NoteType
}) {

    const updateNoteWithUserId = (prevState: any, formData: FormData) =>
        updateNote(prevState, note.id, formData);

    const [state, formAction, pendding] = useActionState(updateNoteWithUserId, initialState)

    return (
        <form action={formAction} className={styles['note-form']}>
            <h1>Edit Your Note</h1>
            <input type="text" name="title" placeholder='title' defaultValue={note.title || ''} />
            {state.title && <p>{state.title}</p>}
            <textarea name="content" placeholder='content' defaultValue={note.content || ''}></textarea>
            {state.content && <p>{state.content}</p>}
            <button type='submit' disabled={pendding}>Update Note</button>
            {state.message && <p>{state.message}</p>}
            <Link href={'/dashboard'}>
                <IoClose className={styles.close} />
            </Link>
        </form>
    )
}