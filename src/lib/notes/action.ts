'use server'

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { notesTable } from "@/db/schema/notes";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const NoteSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'title must be at least 1 character' })
        .max(10, { message: 'title must be at most 10 character' }),
    content: z
        .string()
        .optional()
})

export async function addNote(prevState: any, formData: FormData) {

    const session = await auth();
    const userId = session?.user?.id;

    const note = NoteSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if (!note.success) {
        return {
            message: '',
            ...note.error.flatten().fieldErrors
        }
    }

    try {
        await db
            .insert(notesTable)
            .values({
                title: note.data.title,
                content: note.data.content,
                userId: userId
            })
    } catch (e) {
        return {
            message: 'something is failed',
            title: '',
            content: ''
        }
    }

    revalidateTag('notes')
    redirect('/dashboard')
}

export async function updateNote(prevState: any, id: number, formData: FormData) {
    const session = await auth();
    const userId = session?.user?.id;

    const note = NoteSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!note.success) {
        return {
            message: '',
            ...note.error.flatten().fieldErrors
        }
    }

    try {

        const user = await db
            .select()
            .from(users)
            .where(
                eq(users.id, '' + userId)
            )

        if (user[0].id != userId) {
            return {
                message: "you're not allowed to edit it",
                title: '',
                content: ''
            }
        }

        await db
            .update(notesTable)
            .set({
                title: note.data?.title,
                content: note.data?.content
            })
            .where(
                eq(notesTable.id, id)
            );

    } catch (e) {
        return {
            message: 'something is failed',
            title: '',
            content: ''
        }
    }

    revalidateTag('notes');
    revalidateTag('note');
    redirect('/dashboard')
}