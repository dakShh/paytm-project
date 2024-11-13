import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import bcrypt from 'bcrypt';

import db from '@repo/db';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session }) {
            return session;
        },
        async signIn({ profile }) {
            if (!profile) return false;

            const existingMerchant = await db.merchant.findUnique({ where: { email: profile?.email } });

            if (!existingMerchant) {
                const merchant = await db.merchant.create({
                    data: {
                        email: profile?.email as string,
                        auth_type: 'Google',
                        name: profile.name,
                    },
                });

                console.log('merchant created! ', merchant);
            }

            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXT_AUTH_SECRET,
};
