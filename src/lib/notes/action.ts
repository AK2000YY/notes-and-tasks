'use server'

export async function addNote() {
    await new Promise(res => setTimeout(res, 3000));
}