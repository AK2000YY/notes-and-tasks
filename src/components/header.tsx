'use client'

import Link from "next/link";
import { Toggle } from "./toggle";
import styles from "@/styles/style-dashboard.module.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { RiShutDownLine } from "react-icons/ri";

export function Header() {
    const [active, setActive] = useState(true);
    const [search, setSearch] = useState('');
    const [placeholder, setPlaceHolder] = useState('');
    const router = useRouter();

    useEffect(() => {
        function handlePlaceHolder() {
            if (window.innerWidth > 644)
                setPlaceHolder(`Search in ${active ? 'notes' : 'tasks'}`)
            else
                setPlaceHolder(active ? 'notes' : 'tasks')
        }
        window.addEventListener("resize", handlePlaceHolder);
        handlePlaceHolder()
    }, [active])

    function handleNavigat(formData: FormData) {
        if (!formData.get('search')) return
        router.push(`/dashboard/search/${active ? 'note' : 'task'}/${formData.get('search')}`)
    }

    return (
        <div className={styles.header}>
            <h1 className={styles.logo}>MAKE IT EASY</h1>
            <div>
                <Toggle
                    active={active}
                    onToggle={() => setActive(!active)}
                />
                <form action={handleNavigat} className={styles.search}>
                    <input type="checkbox" name="toggle" hidden checked={active} onChange={() => { }} />
                    <input type="text" name='search' placeholder={placeholder} />
                    <button type="submit"><FaSearch className={styles.icon} /></button>
                </form>
                <Link href={'/dashboard/logout'}><RiShutDownLine className={styles.icon} /></Link>
            </div>
        </div>
    )
}

// href={`/dashboard/search/${active ? 'note' : 'task'}/${search.toLowerCase()}`}