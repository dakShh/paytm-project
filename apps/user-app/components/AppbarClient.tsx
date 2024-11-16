'use client';

import AppBar from '@repo/ui/components/app-bar';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AppBarClient() {
    const { data: session } = useSession();

    console.log('data: ', session);
    return (
        <div>
            <AppBar
                onSignIn={() => signIn()}
                onSignOut={() => signOut()}
                user={session?.user?.email || ''}
            />
        </div>
    );
}
