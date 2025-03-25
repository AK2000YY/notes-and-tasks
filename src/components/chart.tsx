import { unstable_cache, unstable_noStore } from 'next/cache';
import { ChartCard } from './chart-card';
import { db } from '@/db/drizzle';
import { tasksTable } from '@/db/schema/tasks';
import { sql } from 'drizzle-orm';
import { auth } from '@/auth';



const getTaskForSevenDays = async (userId: string) => {
    unstable_noStore();
    const dateOfDay = new Date();
    dateOfDay.setDate(dateOfDay.getDate() - 6);
    const formattedDate = dateOfDay.toISOString().split("T")[0];
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
        const dateOfDay = new Date();
        dateOfDay.setDate(dateOfDay.getDate() - i);
        const formattedDate = dateOfDay.toISOString().split("T")[0];
        if (!result.some(ele => ele.date === formattedDate)) {
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
        });
}

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