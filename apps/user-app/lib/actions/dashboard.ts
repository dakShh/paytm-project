'use server';

import db from '@repo/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../app/api/auth/[...nextauth]/options';
import { Balance } from '@repo/db/types';

interface ErrorResponse {
    status: boolean;
    message: string;
}

interface BalanceTypes {
    currentAmount: number;
    lockedAmount: number;
    totalBalance: number;
}
interface SuccessResponse {
    status: boolean;
    data?: BalanceTypes;
    message?: string;
}

type Result = SuccessResponse;

export async function getCurrentBalance(): Promise<Result> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            status: false,
            message: 'Unauthenticated request :(',
        };
    }

    try {
        const currentBalance: Balance | null = await db.balance.findUnique({
            where: { userId: session?.user?.id },
        });

        if (currentBalance) {
            const totalBalance = currentBalance.amount + currentBalance.locked;

            const data: BalanceTypes = {
                currentAmount: currentBalance.amount,
                lockedAmount: currentBalance.locked,
                totalBalance,
            };

            return {
                status: true,
                data,
            };
        } else {
            return {
                status: false,
                message: 'Error finding user or balance',
            };
        }
    } catch (error) {
        console.log('error: ', error);
        return {
            status: false,
            message: 'Unable to fetch current balance :(',
        };
    }
}

export async function getNumberOfTransactions() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            status: false,
            message: 'Unauthenticated request! :(',
        };
    }

    try {
        const [totalTransactions, processingCount, successCount, failureCount] = await db.$transaction([
            db.onRampTransaction.count({
                where: {
                    userId: session?.user?.id,
                },
            }),
            db.onRampTransaction.count({
                where: {
                    userId: session?.user?.id,
                    status: 'Processing', // Count only processing transactions
                },
            }),
            db.onRampTransaction.count({
                where: {
                    userId: session?.user?.id,
                    status: 'Success', // Count only success transactions
                },
            }),
            db.onRampTransaction.count({
                where: {
                    userId: session?.user?.id,
                    status: 'Failure', // Count only failure transactions
                },
            }),
        ]);

        return {
            status: true,
            data: {
                totalTransactions,
                processingCount,
                successCount,
                failureCount,
            },
        };
    } catch (error) {
        console.log('error: ', error);
        return {
            status: false,
            message: 'Error fetching number of transactions :( ',
        };
    }
}
