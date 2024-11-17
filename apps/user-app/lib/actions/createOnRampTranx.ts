'use server';

import db from '@repo/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../app/api/auth/[...nextauth]/options';

export async function createOnRampTransaction(
    provider: string,
    amount: number
): Promise<{
    status: boolean;
    message?: string;
    error?: string;
}> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            status: false,
            message: 'Unauthenticated! :(',
        };
    }
    const token = (Math.random() * 1000).toString();

    try {
        await db.onRampTransaction.create({
            data: {
                amount: amount * 100,
                provider: provider,
                status: 'Processing',
                token,
                startTime: new Date(),
                userId: Number(session?.user?.id),
            },
        });

        return {
            status: true,
            message: 'Transaction created!  ',
        };
    } catch (error) {
        console.log('Error aaya lawde: ', error);
        return {
            status: false,
            error: 'Transaction failed',
        };
    }
}
