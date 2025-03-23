'use client'

import { useEffect, useRef, useState } from "react";
import styles from '@/styles/style-body.module.css'
import { NoteCard } from "./note-card";
import Link from "next/link";
import { MdNoteAdd } from "react-icons/md";

type Note = {
    id: number;
    title?: string | null;
    content?: string | null;
    date?: string | null;
};

export function ListNoteWithScroll({ noteList }: { noteList: Note[] }) {

    const lastNoteRef = useRef<HTMLDivElement | null>(null);
    const [prevNotesCount, setPrevNotesCount] = useState(noteList.length);

    useEffect(() => {
        if (noteList.length > prevNotesCount) {
            lastNoteRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setPrevNotesCount(noteList.length);
    }, [noteList.length]);


    return (
        <div className={styles['notes-container']}>
            <div className={styles.notes}>
                {noteList.length === 0 && <h1>Add Your Notes</h1>}
                {noteList.map((note, index) =>
                    <div
                        key={note.id}
                        className={styles['note-card']}
                        ref={index === noteList.length - 1 ? lastNoteRef : null}
                    >
                        <NoteCard
                            note={{
                                id: note.id,
                                title: note.title || '',
                                content: note.content || '',
                                date: note.date || ''
                            }}
                        />
                    </div>
                )}
            </div>
            <Link href={'/dashboard/create'} className={styles['add-button']}>
                <MdNoteAdd />
            </Link>
        </div>
    )

}