import styles from '../styles/style-google.module.css'
import Image from 'next/image'
import googleIcon from '@/../public/google.png'

export function GoogleLogin() {
    return (
        <div className={styles.google}>
            <div>
                <p>or continue with</p>
            </div>
            <button>
                Google
                <Image
                    src={googleIcon}
                    width={35}
                    alt={'google'}
                />
            </button>
        </div>
    )
}