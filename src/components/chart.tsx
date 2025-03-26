import { unstable_cache, unstable_noStore } from 'next/cache';
import { ChartCard } from './chart-card';
import { db } from '@/db/drizzle';
import { tasksTable } from '@/db/schema/tasks';
import { sql } from 'drizzle-orm';
import { auth } from '@/auth';

export const getTaskForSevenDays = unstable_cache(
    async (userId: string) => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const formattedDate = yyyy + '-' + mm + '-' + dd;
        console.log('1222', formattedDate)
        const result = await db
            .select({
                date: tasksTable.date,
                totalTasks: sql<number>`COUNT(*)`,
                executedTasks: sql<number>`SUM(CASE WHEN ${tasksTable.executed} = true THEN 1 ELSE 0 END)`,
            })
            .from(tasksTable)
            .where(
                sql`${tasksTable.date} >= ${formattedDate} AND ${tasksTable.userId} = ${userId}`
            )
            .groupBy(tasksTable.date)
            .orderBy(tasksTable.date);

        let initialAdding = [];

        for (let i = 6; i >= 0; i--) {
            const today = new Date();
            const dd = String(today.getDate() - i).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const formattedDate = yyyy + '-' + mm + '-' + dd;
            if (!result.some(ele => ele.date === formattedDate)) {
                console.log('11111', formattedDate)
                initialAdding.push(
                    { date: formattedDate, totalTasks: '0', executedTasks: '0' }
                )
            }
        }

        return [
            ...result,
            ...initialAdding
        ]
            .sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime())
            .map(ele => {
                return {
                    ...ele,
                    date: ele.date?.substring(ele.date?.length - 2),
                }
            })
    },
    ['task-char'],
    { revalidate: 1, tags: ['task-char'] }
)

export async function Chart() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return null

    const tasks = await getTaskForSevenDays(userId)

    console.log(tasks)
    return (
        <ChartCard data={tasks} />
    )
}