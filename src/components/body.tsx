import { Suspense } from "react";
import { Calender } from "./calender";
import { Notes } from "./notes";
import { Tasks } from "./tasks";
import { Chart } from "./chart";
import styles from '@/styles/style-body.module.css'
import { Nav } from "./nav";

export function Body() {
    return (
        <>
            <Nav />
            <div className={styles.body}>
                <Suspense fallback={<div>loading...</div>}>
                    <Notes />
                </Suspense>
                <Suspense fallback={<div>loading...</div>}>
                    <Tasks />
                </Suspense>
                <Chart />
                <Calender />
            </div>
        </>
    )
}