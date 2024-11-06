'use client';

import { useBalance } from '@repo/store';

export default function Balance() {
    const balance = useBalance();
    return <h1>{balance}</h1>;
}
