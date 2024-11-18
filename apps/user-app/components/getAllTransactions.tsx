'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';

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
                                    {trnx?.startTime?.toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true, // Use false for 24-hour format
                                    })}
                                </div>
                            </div>

                            <div>$ {trnx.amount / 100}</div>
                        </div>
                    );
                })}
                <div className={cn('flex justify-end w-full', 'mt-6')}>
                    <div
                        className={cn(
                            'border border-primary',
                            'px-5 py-2 rounded-md',
                            'cursor-pointer hover:bg-primary/90 hover:text-white'
                        )}
                    >
                        <Link href="/transaction">Show all transactions</Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
