import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const secret = process.env.NEXT_AUTH_SECRET || '';
    const session = await getToken({ req: request, secret });
    const url = request.nextUrl;
    const protectedRoutes = ['/', '/dashboard'];
    const authRoutes = ['/sign-in', '/sign-up'];
    console.log('session: ', session);
    // User logged in
    if (session && authRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // User not logged in
    if (!session && protectedRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (url.pathname == '/') return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
}

export const config = {
    matcher: ['/sign-up', '/sign-in', '/', '/dashboard'],
};
