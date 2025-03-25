'use client'

import Link from "next/link";
import styles from '@/styles/style-body.module.css'
import { useState } from "react";

export function Nav() {
    const [selected, setSelected] = useState(1)
    return (
        <ul className={styles.nav}>
            <Link
                onClick={() => setSelected(1)}
                className={selected === 1 ? styles.selected : ''}
                href={'#1'}
            >
                Notes
            </Link>
            <Link
                onClick={() => setSelected(2)}
                className={selected === 2 ? styles.selected : ''}
                href={'#2'}
            >
                Tasks
            </Link>
            <Link
                onClick={() => setSelected(3)}
                className={selected === 3 ? styles.selected : ''}
                href={'#3'}
            >
                Statistics
            </Link>
            <Link
                onClick={() => setSelected(4)}
                className={selected === 4 ? styles.selected : ''}
                href={'#4'}
            >
                Calender
            </Link>
        </ul>
    )
}