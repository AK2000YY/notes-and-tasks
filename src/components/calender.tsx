import styles from '@/styles/style-body.module.css'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

const daysOfWeek: string[] = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
];

const monthsOfYear: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export function Calender() {
    return (
        <div id='4' className={styles.calender}>
            <div className={styles.header}>
                <h1>November, 2025</h1>
                <div className={styles.buttons}>
                    <MdOutlineKeyboardArrowLeft className={styles.button} />
                    <MdOutlineKeyboardArrowRight className={styles.button} />
                </div>
            </div>
            <div className={styles['days-name']}>
                {daysOfWeek.map(ele => (
                    <div key={ele}>{ele.substring(0, 3)}</div>
                ))}
            </div>
            <div className={styles['days-number']}>
                {Array.from({ length: 42 }).map((_, index) => (
                    <div key={index}>{index + 1}</div>
                ))}
            </div>
        </div>
    )
}