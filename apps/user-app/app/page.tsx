'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import AppBarClient from '../components/AppbarClient';

export default function Home() {
    const { data: session } = useSession();
    return (
        <>
            <AppBarClient />
            <h1>wallet home page</h1>
        </>
    );
}
