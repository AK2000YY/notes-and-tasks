import { TaskCreate } from '@/components/task-create';
import styles from '@/styles/style-body.module.css';

export default function Page() {
    return (
        <div className={styles.overlay}>
            <TaskCreate />
        </div>
    )
}