import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protect = ['/dashboard'];
const notProtect = ['/login', '/signup'];

export async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname === '/' && await isAuthenticate())
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));

    if (protect.some(path => req.nextUrl.pathname.startsWith(path)) && !(await isAuthenticate()))
        return NextResponse.redirect(new URL('/login', req.nextUrl));

    if (notProtect.some(path => req.nextUrl.pathname.startsWith(path)) && (await isAuthenticate()))
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));


}


async function isAuthenticate(): Promise<boolean> {
    const session = await auth()
    return !!session?.user
}