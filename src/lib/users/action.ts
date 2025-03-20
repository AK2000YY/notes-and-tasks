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
    name: z
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

export async function createUser(prevState: any, formData: FormData) {
    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    const result = UserSchema.safeParse(user);

    if (!result.success) {
        return {
            message: '',
            ...(result.error.flatten().fieldErrors)
        }
    }

    try {
        await db
            .insert(users)
            .values({
                email: user.email + "",
                password: user.password + "",
                name: user.name + ""
            });
    } catch (e) {
        return {
            message: 'something is error',
            email: '',
            password: '',
            name: ''
        }
    }

    redirect('/login')
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

    try {
        await signIn("credentials", {
            ...user,
            redirect: false
        });
    } catch (e) {
        return {
            message: 'invalid information',
            password: '',
            email: ''
        }
    }

    redirect('/dashboard')

}