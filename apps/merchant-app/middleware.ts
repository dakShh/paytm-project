import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const secret = process.env.NEXT_AUTH_SECRET;
    const session = await getToken({ req: request, secret });
    const url = request.nextUrl;
    const protectedRoutes = ['/'];

    console.log('session: ', session);

    // if the user is logged in
    if (session && url.pathname === '/sign-in') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // User not logged in
    if (!session && protectedRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/sign-in'],
    // matcher: ['/sign-up', '/sign-in', '/', '/dashboard/:path*', '/verify/:path*'],
};
