'use server';

import db from '@repo/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../app/api/auth/[...nextauth]/options';

export async function getAllTransactions() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            status: false,
            message: 'Unauthenticated! :(',
        };
    }

    try {
        const tranx = await db.onRampTransaction.findMany({
            where: { userId: session?.user?.id },
        });

        return {
            status: true,
            data: tranx,
        };
    } catch (error) {
        console.log('Error in getAllTransactions(): ', error);
        return {
            status: false,
            message: 'Failed to fetch all transactions',
        };
    }
}
