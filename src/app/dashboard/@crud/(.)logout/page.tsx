import styles from '@/styles/style-body.module.css'
import { signOut } from '@/auth'
import Link from 'next/link'

export default function Page() {
    return (
        <div className={styles.overlay}>
            <form
                className={styles['delete-note-form']}
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <h1>Confirm Logout</h1>
                <p>Are you sure to logout?</p>
                <div className={styles.buttons}>
                    <button className={styles['cancel-button']}>
                        <Link href={'/dashboard'}>Cancel</Link>
                    </button>
                    <button className={styles['delete-button']} type="submit">Logout</button>
                </div>
            </form>
        </div>
    )
}