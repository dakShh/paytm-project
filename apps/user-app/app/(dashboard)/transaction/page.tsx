'use server';

import { cn } from '@repo/ui/lib/utils';
import AppBarClient from '../../../components/AppbarClient';

// Server actions
import { getAllTransactions } from '../../../lib/actions/getAllTransactions';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';

import { PackageOpen } from 'lucide-react';
import { Button } from '@repo/ui/components/button';

export default async function Transaction() {
    const { status, data: tranx } = await getAllTransactions();
    console.log('from parent: ', tranx);

    if (!tranx?.length) {
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
        <div>
            <AppBarClient />
            <div className={cn('container mx-auto', 'mt-5')}>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tranx?.map((trnx, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex justify-between',
                                        'px-4 py-2',
                                        'rounded-sm',
                                        'bg-neutral-50 border-b',
                                        'mb-2',
                                        'hover:cursor-pointer hover:bg-neutral-200'
                                    )}
                                >
                                    <div className="flex gap-x-4">
                                        {index + 1}
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
                                    </div>

                                    <div>$ {trnx.amount / 100}</div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
