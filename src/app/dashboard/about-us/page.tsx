import styles from '@/styles/style-body.module.css'

export default function Page() {
    return (
        <div className={styles.overlay}>
            <div className={styles['about-us']}>
                <h1>Abdulkarim Kourini</h1>
                <h2>Languages</h2>
                <ul>
                    <li>Kotlin</li>
                    <li>JavaScript</li>
                    <li>Php</li>
                    <li>dart</li>
                    <li>Html</li>
                    <li>Css</li>
                </ul>
                <h2>Framworks & Libraries</h2>
                <ul>
                    <li>Jetpack Compose</li>
                    <li>Next Js</li>
                    <li>Zod</li>
                    <li>Auth Js</li>
                    <li>Flutter</li>
                </ul>
            </div>
        </div>
    )
}