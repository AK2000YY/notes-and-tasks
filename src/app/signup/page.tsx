import Link from 'next/link'
import styles from '../../styles/style-auth-page.module.css'

export default function Page() {
    return (
        <div className={styles['parent']}>
            <div className={styles['first-half']}></div>
            <div className={styles['second-half']}>
                <h1>Create an account</h1>
                <div>
                    <p>you have an account?</p>
                    <Link href='/login'>login</Link>
                </div>
                <form className={styles.form}>
                    <div>
                        <input type="text" name="first-name" placeholder="first name" />
                        <input type="text" name="last-name" placeholder="last name" />
                    </div>
                    <input type="email" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />
                    <input type="submit" value="Create Account" />
                </form>
            </div>
        </div>
    )
}