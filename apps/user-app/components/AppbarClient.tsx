'use client';

import AppBar from '@repo/ui/components/app-bar';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AppBarClient() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div>
            <AppBar
                onSignIn={() => signIn()}
                onSignOut={() => {
                    signOut();
                    router.push('/sign-in');
                }}
                user={session?.user?.email || ''}
            />
        </div>
    );
}
