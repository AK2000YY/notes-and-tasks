import { Calender } from "./calender";
import { Notes } from "./notes";
import { Tasks } from "./tasks";
import { Weather } from "./weather";
import styles from '@/styles/style-body.module.css'

export function Body() {
    return (
        <div className={styles.body}>
            <Notes />
            <Tasks />
            <Weather />
            <Calender />
        </div>
    )
}