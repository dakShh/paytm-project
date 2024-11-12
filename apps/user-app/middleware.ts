import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const secret = process.env.NEXT_AUTH_SECRET;
    const session = await getToken({ req: request, secret });
    const url = request.nextUrl;

    const protectedRoutes = ['/'];

    // console.log('session: ', session);
    console.log('url: ', url);

    // LOGIC: if the user is logged in
    // if (
    //     session &&
    //     (url.pathname === '/sign-in' ||
    //         url.pathname === '/sign-up' ||
    //         url.pathname === '/verify' ||
    //         url.pathname === '/')
    // ) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // User not logged in
    if (!session && protectedRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/sign-up', request.url));
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/sign-up', '/sign-in'],
    // matcher: ['/sign-up', '/sign-in', '/', '/dashboard/:path*', '/verify/:path*'],
};
