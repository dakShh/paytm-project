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
                try {
                    const existingUser = (await db.user.findFirst({
                        where: { email: credentials?.identifier },
                    })) as User;

                    if (!existingUser) {
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
        async jwt({ token, user }) {
            if (user) {
                token.id = Number(user?.id);
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
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
