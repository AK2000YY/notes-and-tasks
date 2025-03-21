import { Header } from '@/components/header'
import styles from '../../styles/style-dashboard.module.css'
import { Footer } from '@/components/footer'
import { Body } from '@/components/body'

export default function Page() {
    return (
        <div className={styles.dashboard}>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}