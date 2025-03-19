'use server'

import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/auth"

const UserSchema = z.object({
    email: z
        .string()
        .email(),
    firstName: z
        .string()
        .trim()
        .max(20, { message: 'first name must be at most 20 character' })
        .optional(),
    lastName: z
        .string()
        .trim()
        .max(20, { message: 'last name must be at most 20 character' })
        .optional(),
    password: z
        .string()
        .trim()
        .min(6, { message: 'password must be at lest 6 character' })
        .max(15, { message: 'password must be at most 15 character' })
})

export async function signInWithGoogle(prevState: any, formData: FormData) {
    await signIn("google", {
        redirectTo: '/dashboard'
    })
}

export async function createUser(formData: FormData) {
    const user = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    const result = UserSchema.safeParse(user);

    if (!result.success) {
        const error = result.error;
        return
    }

    await db
        .insert(users)
        .values({
            email: user.email + "",
            password: user.password + "",
            name: user.lastName + ""
        });

    redirect('/dashboard')
}

export async function getUser(prevState: any, formData: FormData) {
    const user = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const result = UserSchema.safeParse(user);

    if (!result.success) {
        return {
            message: '',
            ...(result.error.flatten().fieldErrors)
        };
    }

    const userDb = await db
        .select()
        .from(users)
        .where(and(
            eq(users.email, "" + user.email),
            eq(users.password, "" + user.password)
        ));

    if (userDb.length === 0) {
        return {
            message: 'email or password is wrong!',
            email: '',
            password: ''
        }
    }

    redirect('/dashboard')
}