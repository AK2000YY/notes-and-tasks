import { LuNotepadText } from 'react-icons/lu'
import styles from '../styles/style-toggle.module.css'
import { MdOutlineTask } from 'react-icons/md'


export function Toggle({ active, onToggle }: {
    active: boolean,
    onToggle: () => void
}) {
    return (
        <div
            className={styles.toggle}
            onClick={onToggle}
        >
            <div className={active ? styles['circle-left'] : styles['circle-right']}>
                {
                    !active ?
                        <MdOutlineTask className={styles.icon} /> :
                        <LuNotepadText className={styles.icon} />
                }
            </div>
        </div>
    )
}