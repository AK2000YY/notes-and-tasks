'use server'

import { auth } from "@/auth"
import { db } from "@/db/drizzle";
import { tasksTable } from "@/db/schema/tasks";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function toggleTask(prevState: any, id: number) {
    const session = await auth();
    const userId = session?.user?.id;

    console.log('ak', userId)

    if (!userId)
        return {
            message: 'you are not log'
        }

    try {
        const task = await db
            .select()
            .from(tasksTable)
            .where(
                and(
                    eq(tasksTable.id, id),
                    eq(tasksTable.userId, userId)
                )
            )

        if (task.length === 0 || task[0].executed)
            return {
                message: 'you have not this task'
            }

        await db
            .update(tasksTable)
            .set({
                executed: !task[0].executed
            })
            .where(
                eq(tasksTable.id, id)
            )
    } catch (e) {
        return {
            message: 'something is error'
        }
    }

    revalidateTag('tasks')

}