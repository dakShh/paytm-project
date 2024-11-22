'use server';

import db from '@repo/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../app/api/auth/[...nextauth]/options';

export async function getAllTransactions(options: { page: number; limit: number }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            status: false,
            message: 'Unauthenticated! :(',
        };
    }
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    try {
        const tranx = await db.onRampTransaction.findMany({
            where: { userId: session?.user?.id },
            skip,
            take: limit,
            orderBy: { startTime: 'desc' },
        });

        const totalRecords = await db.onRampTransaction.count({ where: { userId: session?.user?.id } });

        const totalPages = Math.ceil(totalRecords / limit);

        return {
            status: true,
            data: tranx,
            meta: {
                currentPage: page,
                totalRecords,
                totalPages,
                limit,
                skip,
            },
        };
    } catch (error) {
        console.log('Error in getAllTransactions(): ', error);
        return {
            status: false,
            message: 'Failed to fetch all transactions',
        };
    }
}
