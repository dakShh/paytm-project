'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';
import { PackageOpen } from 'lucide-react';

interface ITransactionProps {
    transactions: {
        amount: number;
        id: number;
        provider: string;
        startTime: Date;
        status: string;
    }[];
}
export default function GetAllTransactionsCard({ transactions }: ITransactionProps) {
    console.log('GetAllTransactionsCard: ', transactions);

    if (!transactions.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>

                <CardContent>
                    <div
                        className={cn(
                            'text-sm text-muted-foreground',
                            'flex flex-col gap-y-2 items-center',
                            'py-10'
                        )}
                    >
                        <PackageOpen className="text-neutral-200 h-12 w-12 stroke-1" />
                        No Transactions to show
                    </div>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions?.map((trnx, index) => {
                    return (
                        <div
                            key={index}
                            className={cn(
                                'flex justify-between',
                                'px-4 py-2',
                                'rounded-sm',
                                'bg-neutral-50 border-b',
                                'mb-2'
                            )}
                        >
                            <div className={cn('flex flex-col')}>
                                <div>
                                    {trnx.provider} ~ {trnx?.status || ''}
                                </div>
                                <div className={cn('text-xs text-muted-foreground pr-10')}>
                                    {trnx?.startTime.toString() || ''}
                                </div>
                            </div>

                            <div>$ {trnx.amount / 100}</div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
