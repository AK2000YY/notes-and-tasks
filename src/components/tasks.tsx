import { auth } from '@/auth'
import { db } from '@/db/drizzle'
import { tasksTable } from '@/db/schema/tasks'
import styles from '@/styles/style-body.module.css'
import { and, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { TaskList } from './task-list'


const getTodayTasks = unstable_cache(
    async (userId: string) => {
        const dateOfDay = new Date().toISOString().split("T")[0];
        return await db
            .select()
            .from(tasksTable)
            .where(
                and(
                    eq(tasksTable.userId, userId),
                    eq(tasksTable.date, dateOfDay)
                )
            )
    },
    ['tasks'],
    { revalidate: 3, tags: ['tasks'] }
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