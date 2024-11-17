'use server';

import { cn } from '@repo/ui/lib/utils';
import AppBarClient from '../../../components/AppbarClient';
import AddMoneyCard from '../../../components/AddMoneyCard';
import GetBalanceCard from '../../../components/getBalanceCard';
import GetAllTransactionsCard from '../../../components/getAllTransactions';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/options';

import db from '@repo/db';

async function getBalance() {
    const session = await getServerSession(authOptions);

    const balance = await db.balance.findUnique({
        where: {
            userId: session?.user?.id || undefined,
        },
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0,
    };
}

async function getAllTransactions() {
    const session = await getServerSession(authOptions);

    const transactions = await db.onRampTransaction.findMany({
        where: { userId: session?.user?.id || undefined },
        take: 5,
        orderBy: { startTime: 'desc' },
    });
    return transactions?.map((t, index) => {
        return {
            id: t.id,
            key: index,
            provider: t.provider,
            startTime: t.startTime,
            amount: t.amount,
            status: t.status,
        };
    });
}

export default async function Transfer() {
    const { amount, locked } = await getBalance();
    const transactions = await getAllTransactions();
    console.log('transactions: ', transactions);
    return (
        <div>
            <AppBarClient />
            <div className={cn('container mx-auto my-5')}>
                <div className={cn('grid grid-cols-2 gap-5')}>
                    <div className={cn('w-full ')}>
                        <AddMoneyCard />
                    </div>
                    <div className={cn('w-full', 'flex flex-col gap-y-4')}>
                        <GetBalanceCard amount={amount} locked={locked} />
                        <GetAllTransactionsCard transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
