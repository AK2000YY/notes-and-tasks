import Link from "next/link";
import styles from "../signup/style.module.css"

export default function Page() {
    return (
        <div className={styles['parent']}>
            <div className={styles['first-half']}></div>
            <div className={styles['second-half']}>
                <h1>Login</h1>
                <div>
                    <p>you don't have an account?</p>
                    <Link href='/signup'>signup</Link>
                </div>
                <form className={styles.form}>
                    <input type="email" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}