'use client'

import Link from 'next/link'
import styles from '../../styles/style-auth-page.module.css'
import { GoogleLogin } from '@/components/google-login'
import { useActionState } from 'react';
import { createUser } from '@/lib/users/action';
import firstImage from '@/../public/first-image.png'
import Image from 'next/image';

const initialState = {
    message: '',
    email: '',
    password: '',
    name: ''
}

export default function Page() {

    const [state, formAction, pending] = useActionState(createUser, initialState);

    return (
        <div className={styles['parent']}>
            <div className={styles['first-half']}>
                <Image
                    width={400}
                    src={firstImage}
                    alt=''
                />
            </div>
            <div className={styles['second-half']}>
                <h1>Create an account</h1>
                <div className={styles['discription']}>
                    <p>you have an account?</p>
                    <Link href='/login'>login</Link>
                </div>
                <form className={styles.form} action={formAction}>
                    <input type="text" name="name" placeholder="name" />
                    {state.name && <p>{state.name}</p>}
                    <input type="email" name="email" placeholder="email" />
                    {state.email && <p>{state.email}</p>}
                    <input type="password" name="password" placeholder="password" />
                    {state.password && <p>{state.password}</p>}
                    <input type="submit" value="Create Account" />
                    {state.message && <p>{state.message}</p>}
                </form>
                <GoogleLogin />
            </div>
        </div>
    )
}