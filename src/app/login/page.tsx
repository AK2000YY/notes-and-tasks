'use client'

import Link from "next/link";
import styles from "../../styles/style-auth-page.module.css"
import { useActionState } from "react";
import { getUser } from "@/lib/users/action";

const initialState = {
    message: '',
    email: '',
    password: ''
}

export default function Page() {

    const [state, formAction, pending] = useActionState(getUser, initialState);

    return (
        <div className={styles['parent']}>
            <div className={styles['first-half']}></div>
            <div className={styles['second-half']}>
                <h1>Login</h1>
                <div>
                    <p>you don't have an account?</p>
                    <Link href='/signup'>signup</Link>
                </div>
                <form action={formAction}>
                    <input type="email" name="email" placeholder="email" />
                    {state.email && <p>{state.email}</p>}
                    <input type="password" name="password" placeholder="password" />
                    {state.password && <p>{state.password}</p>}
                    <input type="submit" value="Login" disabled={pending} />
                    {state.message && <p>{state.message}</p>}
                </form>
            </div>
        </div>
    )
}