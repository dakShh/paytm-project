import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import db from '@repo/db';

import { signinSchema } from '@repo/schemas/signInSchema';
import { User } from '@repo/common/types/AuthTypes';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                sex: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                console.log('credentials: ', credentials);

                try {
                    const existingUser = (await db.user.findFirst({
                        where: { email: credentials?.identifier },
                    })) as User;

                    if (!existingUser) {
                        console.log('No existing user');
                        return null;
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials?.password,
                        existingUser?.password ?? ''
                    );

                    if (isPasswordCorrect) {
                        return existingUser;
                    }

                    return null;
                } catch (error) {
                    console.log('error: ', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async session({ session }) {
            return session;
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
