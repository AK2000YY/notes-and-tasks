'use client'

import styles from '@/styles/style-body.module.css'
import { useState } from 'react';
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

    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();

    function handleNextMonth() {
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        setCurrentMonth(nextMonth);
        setCurrentYear(nextYear);
    }

    function handlePrevMonth() {
        const nextMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const nextYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        setCurrentMonth(nextMonth);
        setCurrentYear(nextYear);
    }

    return (
        <div id='4' className={styles.calender}>
            <div className={styles.header}>
                <h1>{monthsOfYear[currentMonth]}, {currentYear}</h1>
                <div className={styles.buttons}>
                    <MdOutlineKeyboardArrowLeft className={styles.button} onClick={handlePrevMonth} />
                    <MdOutlineKeyboardArrowRight className={styles.button} onClick={handleNextMonth} />
                </div>
            </div>
            <div className={styles['days-name']}>
                {daysOfWeek.map(ele => (
                    <div key={ele}>{ele.substring(0, 3)}</div>
                ))}
            </div>
            <div className={styles['days-number']}>
                {[...Array(firstDayInMonth).keys()].map((_, index) =>
                    <div key={'empty' + index}></div>
                )}
                {[...Array(daysInMonth)].map((_, index) =>
                    <div
                        key={index + 1}
                        className={
                            index + 1 === currentDate.getDate()
                                && currentMonth === currentDate.getMonth()
                                && currentYear === currentDate.getFullYear()
                                ? styles.active : ''}
                    >
                        {index + 1}
                    </div>
                )}
            </div>
        </div>
    )
}