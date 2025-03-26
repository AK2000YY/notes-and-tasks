import { auth } from '@/auth'
import { db } from '@/db/drizzle'
import { tasksTable } from '@/db/schema/tasks'
import styles from '@/styles/style-body.module.css'
import { and, asc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { TaskList } from './task-list'


const getTodayTasks = unstable_cache(
    async (userId: string) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const dateOfDay = yyyy + '-' + mm + '-' + dd;
        console.log('123', dateOfDay);
        return await db
            .select()
            .from(tasksTable)
            .where(
                and(
                    eq(tasksTable.userId, userId),
                    eq(tasksTable.date, dateOfDay)
                )
            )
            .orderBy(
                asc(tasksTable.executed),
                asc(tasksTable.id)
            )
    },
    ['tasks'],
    { revalidate: 1, tags: ['tasks'] }
)


export async function Tasks() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return null

    const todayTaskes = await getTodayTasks(userId);

    return (
        <div className={styles['tasks-container']}>
            <TaskList taskList={todayTaskes} />
        </div>
    )
}