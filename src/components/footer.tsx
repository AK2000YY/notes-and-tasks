import styles from '@/styles/style-dashboard.module.css';
import Link from 'next/link';
import { SiFacebook, SiTelegram, SiWhatsapp } from 'react-icons/si';

export function Footer() {
    return (
        <div className={styles.footer}>
            <h1>
                &copy; 2025<br />
                All Rigth Reserved
            </h1>
            <ul>
                <li><Link href={'/dashboard/about-us'}>About us</Link></li>
                <li>
                    <h5>contact me</h5>
                    <ul>
                        <a href="https://wa.me/0988048552" target="_blank" rel="noopener noreferrer">
                            <SiWhatsapp className={styles.icon} />
                        </a>
                        <a href="https://m.me/Abdul.Karim.Kourini" target="_blank" rel="noopener noreferrer">
                            <SiFacebook className={styles.icon} />
                        </a>
                        <a href="https://t.me/ak2000yy" target="_blank" rel="noopener noreferrer">
                            <SiTelegram className={styles.icon} />
                        </a>
                    </ul>
                </li>
            </ul>
        </div>
    );
}