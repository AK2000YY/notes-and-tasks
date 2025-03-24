import { Suspense } from "react";
import { Calender } from "./calender";
import { Notes } from "./notes";
import { Tasks } from "./tasks";
import { Chart } from "./chart";
import styles from '@/styles/style-body.module.css'

export function Body() {
    return (
        <div className={styles.body}>
            <Suspense fallback={<div>loading...</div>}>
                <Notes />
            </Suspense>
            <Tasks />
            <Chart />
            <Calender />
        </div>
    )
}