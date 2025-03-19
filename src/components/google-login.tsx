'use client'

import styles from '../styles/style-google.module.css'
import Image from 'next/image'
import googleIcon from '@/../public/google.png'
import { signInWithGoogle } from '@/lib/users/action'
import { useActionState } from 'react'

let initialState: any

export function GoogleLogin() {

    const [state, formAction, pending] = useActionState(signInWithGoogle, initialState)

    return (
        <div className={styles.google}>
            <div>
                <p>or continue with</p>
            </div>
            <form action={formAction}>
                <button type='submit' disabled={pending}>
                    Google
                    <Image
                        src={googleIcon}
                        width={35}
                        alt={'google'}
                    />
                </button>
            </form>
        </div>
    )
}