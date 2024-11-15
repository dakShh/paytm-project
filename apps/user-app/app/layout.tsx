import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@repo/ui/globals.css';
import { Toaster } from '@repo/ui/components/toaster';
import AppBarClient from '../components/AppbarClient';

// Providers
import { Providers } from '../lib/Provider';
import { NextAuthProvider } from '../lib/NextAuthProvider';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    title: 'PayTM Bank',
    description: 'Banking application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <NextAuthProvider>
                    <Providers>
                        {/* <AppBarClient /> */}
                        {children}
                    </Providers>
                </NextAuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
