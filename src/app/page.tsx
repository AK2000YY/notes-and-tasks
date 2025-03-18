import Link from 'next/link'
import styles from './style.module.css'

export default function Page() {
  return (
    <div className={styles.one}>
      <h1 className={styles['head-line']}>make your life easier</h1>
      {/* <p className={styles['right-top']}>create your notes</p>
      <p className={styles['left-bottom']}>do your daily tasks</p>
      <p className={styles['left-top']}>organize your life</p> */}
      <div className={styles['buttons']}>
        <Link href={'/login'} className={styles.button}>login</Link>
        <Link href={'/signup'} className={styles.button}>signup</Link>
      </div>
    </div>
  )
}