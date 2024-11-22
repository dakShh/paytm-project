'use client';

import { Button } from '@repo/ui/components/button';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();

    return (
        <div className={''}>
            <div>Merchant app {`${session?.user?.email ?? 'Not logged in'}`}</div>
            {session?.user?.email ? (
                <Button onClick={() => signOut()}>Sign out</Button>
            ) : (
                <Button onClick={() => signIn()}>Sign in</Button>
            )}
        </div>
    );
}
