import Link from 'next/link'
import styles from '../../styles/style-auth-page.module.css'
import { GoogleLogin } from '@/components/google-login'

export default function Page() {
    return (
        <div className={styles['parent']}>
            <div className={styles['first-half']}></div>
            <div className={styles['second-half']}>
                <h1>Create an account</h1>
                <div className={styles['discription']}>
                    <p>you have an account?</p>
                    <Link href='/login'>login</Link>
                </div>
                <form className={styles.form}>
                    <input type="text" name="name" placeholder="name" />
                    <input type="email" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />
                    <input type="submit" value="Create Account" />
                </form>
                <GoogleLogin />
            </div>
        </div>
    )
}