'use client'

import { Toggle } from "./toggle";
import styles from "@/styles/style-dashboard.module.css"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function Header() {
    const [active, setActive] = useState(true);
    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>MAKE IT EASY</h1>
            <div>
                <Toggle
                    active={active}
                    onToggle={() => setActive(!active)}
                />
                <form action="" className={styles.search}>
                    <input type="text" name='search' placeholder={`Search ${active ? 'notes' : 'tasks'}...`} />
                    <button type="submit"><FaSearch className={styles.icon} /></button>
                </form>
            </div>
        </div>
    )
}