'use server'

import { auth } from "@/auth"
import { db } from "@/db/drizzle";
import { tasksTable } from "@/db/schema/tasks";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TaskSchema = z.object({
    title: z
        .string()
        .trim()
        .max(20, { message: 'title must be at most 20 character' })
})

export async function toggleTask(prevState: any, id: number) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId)
        return {
            message: 'you are not allowed to do this'
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

export async function createTask(prevState: any, formDate: FormData) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId)
        return {
            message: 'you are not allowed to do this',
            title: ''
        }

    const task = TaskSchema.safeParse({
        title: formDate.get('title')
    });

    if (!task.success) {
        return {
            message: '',
            ...task.error.flatten().fieldErrors
        }
    }

    try {
        await db
            .insert(tasksTable)
            .values({
                title: task.data.title,
                userId: userId
            })
    } catch (e) {
        return {
            message: 'something is failed',
            title: ''
        }
    }

    revalidateTag('tasks')
    redirect('/dashboard')
}